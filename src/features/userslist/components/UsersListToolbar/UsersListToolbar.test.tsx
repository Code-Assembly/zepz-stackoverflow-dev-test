import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Order } from 'api/stackexchange';
import { UsersSort } from 'api/stackexchange/users';

import { UsersListToolbar } from './UsersListToolbar';
import { UsersListToolbarActions } from './constants';

const mockOnAction = jest.fn();

describe('<UsersListToolbar>', () => {
	it('Search input dispatches the correct action', async () => {
		render(<UsersListToolbar searchTerm={''} onAction={mockOnAction} />);

		const textInputSearchName = screen.getByTestId('textinput-searchname');
		const input = textInputSearchName.querySelector('input');

		const query = 'A man called BOB!';

		fireEvent.change(input!, {
			target: { value: query },
		});

		await waitFor(() =>
			expect(mockOnAction).toBeCalledWith({
				type: UsersListToolbarActions.SEARCH_NAME,
				searchTerm: query,
			})
		);

		const clearSearchBtn = await screen.getByTestId(
			'textinput-searchname-btn-clear'
		);

		expect(clearSearchBtn).toBeVisible();

		fireEvent.click(clearSearchBtn);

		expect(mockOnAction).toBeCalledWith({
			type: UsersListToolbarActions.SEARCH_NAME,
			searchTerm: '',
		});
	});

	it('Selecting Sort options dispatches the correct action', async () => {
		render(
			<UsersListToolbar sortOn={UsersSort.REPUTATION} onAction={mockOnAction} />
		);

		const sortOnSelect = await screen.getByTestId('select-sorton');
		fireEvent.mouseDown(sortOnSelect.querySelector('[role="button"]')!);

		const sortOptionName = screen.getByTestId(
			`select-option-sorton-${UsersSort.NAME}`
		);

		fireEvent.click(sortOptionName);

		expect(mockOnAction).toBeCalledWith({
			type: UsersListToolbarActions.SORT_ON,
			sortOn: UsersSort.NAME,
		});

		const sortOptionModified = screen.getByTestId(
			`select-option-sorton-${UsersSort.MODIFIED}`
		);

		fireEvent.click(sortOptionModified);

		expect(mockOnAction).toBeCalledWith({
			type: UsersListToolbarActions.SORT_ON,
			sortOn: UsersSort.MODIFIED,
		});
	});

	it('Toggling OrderBy options dispatches the correct actions', () => {
		const { rerender } = render(
			<UsersListToolbar orderBy={Order.DESCENDING} onAction={mockOnAction} />
		);

		let btnOrderByDescending = screen.getByTestId('btn-orderby-descending');
		expect(btnOrderByDescending).toBeDisabled();

		let btnOrderByAscending = screen.getByTestId('btn-orderby-ascending');
		fireEvent.click(btnOrderByAscending);

		expect(mockOnAction).toBeCalledWith({
			type: UsersListToolbarActions.ORDER_BY,
			orderBy: Order.ASCENDING,
		});

		rerender(
			<UsersListToolbar orderBy={Order.ASCENDING} onAction={mockOnAction} />
		);

		btnOrderByAscending = screen.getByTestId('btn-orderby-ascending');
		expect(btnOrderByAscending).toBeDisabled();

		btnOrderByDescending = screen.getByTestId('btn-orderby-descending');
		fireEvent.click(btnOrderByDescending);

		expect(mockOnAction).toBeCalledWith({
			type: UsersListToolbarActions.ORDER_BY,
			orderBy: Order.DESCENDING,
		});
	});

	it('Next and Previous navigation button render correctly', () => {
		const { rerender } = render(
			<UsersListToolbar hasNextPage={false} hasPreviousPage={false} />
		);

		let btnPageNext = screen.getByTestId('btn-page-next');
		let btnPagePrevious = screen.getByTestId('btn-page-previous');

		expect(btnPageNext).toBeDisabled();
		expect(btnPagePrevious).toBeDisabled();

		rerender(<UsersListToolbar hasNextPage={true} hasPreviousPage={true} />);

		btnPageNext = screen.getByTestId('btn-page-next');
		btnPagePrevious = screen.getByTestId('btn-page-previous');

		expect(btnPageNext).toBeEnabled();
		expect(btnPagePrevious).toBeEnabled();
	});

	it('Next and Previous navigation buttons dispatch the correct actions', () => {
		render(
			<UsersListToolbar
				hasNextPage={true}
				hasPreviousPage={true}
				onAction={mockOnAction}
			/>
		);

		const btnPageNext = screen.getByTestId('btn-page-next');
		fireEvent.click(btnPageNext);

		expect(mockOnAction).toBeCalledWith({
			type: UsersListToolbarActions.NEXT_PAGE,
		});

		const btnPagePrevious = screen.getByTestId('btn-page-previous');
		fireEvent.click(btnPagePrevious);

		expect(mockOnAction).toBeCalledWith({
			type: UsersListToolbarActions.PREVIOUS_PAGE,
		});
	});
});
