import React, { FC, useState } from 'react';

import { Box, Paper, Typography } from '@mui/material';

import useAxios from 'axios-hooks';

import { Order } from 'api/stackexchange';
import {
	UsersResponseData,
	UsersSort,
	buildUsersRequest,
} from 'api/stackexchange/users';
import {
	UsersList,
	UsersListSkeleton,
	UsersListToolbar,
	UsersListToolbarAction,
	UsersListToolbarActions,
} from 'features/userslist';

import { ErrorAlert } from './components/ErrorAlert';
import { PAGE_SIZE } from './constants';

export const UsersListPage: FC = () => {
	// State

	// Should be moved to a useReducer in a separate state object state file
	const [inname, setInname] = useState<string>('');
	const [sort, setSort] = useState<UsersSort>(UsersSort.REPUTATION);
	const [order, setOrder] = useState<Order>(Order.DESCENDING);
	const [page, setPage] = useState<number>(1);

	// Data Fetching
	const [{ data, loading, error }] = useAxios<UsersResponseData>(
		buildUsersRequest({
			pagesize: PAGE_SIZE,
			page,
			inname: inname?.length > 0 ? inname : undefined,
			sort,
			order,
		})
	);

	// Event Handlers

	const onUserListToolbarAction = (action: UsersListToolbarAction) => {
		console.log(action);
		switch (action.type) {
			case UsersListToolbarActions.NEXT_PAGE:
				if (data?.has_more) {
					setPage(page + 1);
				}
				break;
			case UsersListToolbarActions.PREVIOUS_PAGE:
				if (page > 1) {
					setPage(page - 1);
				}
				break;
			case UsersListToolbarActions.SEARCH_NAME:
				setInname(action.searchTerm);
				break;
			case UsersListToolbarActions.SORT_ON:
				setSort(action.sortOn);
				break;
			case UsersListToolbarActions.ORDER_BY:
				setOrder(action.orderBy);
				break;
		}
	};

	// Templates

	let content = null;

	if (loading) {
		content = <UsersListSkeleton listSize={PAGE_SIZE} />;
	} else if (error) {
		content = (
			<Paper elevation={2} sx={{ width: '100%' }}>
				<ErrorAlert error={error} />
			</Paper>
		);
	} else {
		content = <UsersList users={data?.items} />;
	}

	// Component

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				my: 4,
			}}
		>
			<Typography
				component="h1"
				variant="h4"
				sx={{ mb: 2, alignSelf: 'flex-start' }}
			>
				Stack Overflow Users
			</Typography>
			<Box
				sx={{
					width: '100%',
					position: 'relative',
				}}
			>
				<UsersListToolbar
					disabled={loading || error != null}
					searchTerm={inname}
					sortOn={sort}
					orderBy={order}
					hasNextPage={data?.has_more}
					hasPreviousPage={page > 1}
					onAction={onUserListToolbarAction}
				/>
				{content}
			</Box>
		</Box>
	);
};
