import { Order } from 'api/stackexchange';
import { UsersSort } from 'api/stackexchange/users';

import { UsersListToolbarActions } from './constants';

type PaginationAction = {
	type:
		| UsersListToolbarActions.PREVIOUS_PAGE
		| UsersListToolbarActions.NEXT_PAGE;
};

type SearchNameAction = {
	type: UsersListToolbarActions.SEARCH_NAME;
	searchTerm: string;
};

type SortOnAction = {
	type: UsersListToolbarActions.SORT_ON;
	sortOn: UsersSort;
};

type OrderByAction = {
	type: UsersListToolbarActions.ORDER_BY;
	orderBy: Order;
};

export type UsersListToolbarAction =
	| PaginationAction
	| SearchNameAction
	| SortOnAction
	| OrderByAction;

export interface UsersListToolbarProps {
	searchTerm?: string;
	sortOn?: UsersSort;
	orderBy?: Order;
	hasNextPage?: boolean;
	hasPreviousPage?: boolean;
	disabled?: boolean;
	onAction?: (action: UsersListToolbarAction) => void;
}
