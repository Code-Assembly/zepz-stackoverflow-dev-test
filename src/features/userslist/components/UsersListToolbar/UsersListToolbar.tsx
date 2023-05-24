import React, { FC, useCallback, useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import {
	AppBar,
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Toolbar,
	capitalize,
	debounce,
} from '@mui/material';

import { Order } from 'api/stackexchange';
import { UsersSort } from 'api/stackexchange/users';
import { UsersListToolbarActions } from 'features/userslist/components/UsersListToolbar/constants';

import { UsersListToolbarProps } from './types';

export const UsersListToolbar: FC<UsersListToolbarProps> = ({
	searchTerm = '',
	sortOn = UsersSort.REPUTATION,
	orderBy = Order.DESCENDING,
	hasNextPage = false,
	hasPreviousPage = false,
	disabled = false,
	onAction,
}) => {
	// State

	const [search, setSearch] = useState<string>(searchTerm);

	// Effects~`

	useEffect(() => {
		setSearch(searchTerm);
	}, [searchTerm]);

	// Utils

	const debouncedSearchAction = useCallback(
		debounce((searchTerm: string) => {
			onAction?.({
				type: UsersListToolbarActions.SEARCH_NAME,
				searchTerm,
			});
		}, 300),
		[]
	);

	// Event Handlers

	const onSearchName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
		debouncedSearchAction(event.target.value?.trim() ?? '');
	};

	const onClearSearchName = () => {
		onAction?.({
			type: UsersListToolbarActions.SEARCH_NAME,
			searchTerm: '',
		});
	};

	// Component

	return (
		<AppBar
			position="sticky"
			variant="elevation"
			color="inherit"
			sx={{ mb: 4 }}
			data-testid="UsersListToolbar"
		>
			<Toolbar>
				<TextField
					label="Name search"
					size="small"
					id="outlined-start-adornment"
					sx={{ mr: 1, width: 200 }}
					value={search}
					onChange={onSearchName}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
						endAdornment:
							search?.trim().length > 0 ? (
								<IconButton
									color="error"
									onClick={onClearSearchName}
									data-testid="textinput-searchname-btn-clear"
								>
									<ClearIcon />
								</IconButton>
							) : null,
					}}
					data-testid="textinput-searchname"
				/>

				<FormControl
					size="small"
					sx={{ width: 200, mr: 1 }}
					disabled={disabled}
				>
					<InputLabel id="users-sort-on-select-label">Sort On</InputLabel>
					<Select
						labelId="users-sort-on-select-label"
						value={sortOn}
						label="Sort On"
						onChange={(event: SelectChangeEvent) =>
							onAction?.({
								type: UsersListToolbarActions.SORT_ON,
								sortOn: event.target.value as UsersSort,
							})
						}
						data-testid="select-sorton"
					>
						<MenuItem
							value={UsersSort.REPUTATION}
							data-testid={`select-option-sorton-${UsersSort.REPUTATION}`}
						>
							{capitalize(UsersSort.REPUTATION)}
						</MenuItem>
						<MenuItem
							value={UsersSort.NAME}
							data-testid={`select-option-sorton-${UsersSort.NAME}`}
						>
							{capitalize(UsersSort.NAME)}
						</MenuItem>
						<MenuItem
							value={UsersSort.MODIFIED}
							data-testid={`select-option-sorton-${UsersSort.MODIFIED}`}
						>
							{capitalize(UsersSort.MODIFIED)}
						</MenuItem>
						<MenuItem
							value={UsersSort.CREATION}
							data-testid={`select-option-sorton-${UsersSort.CREATION}`}
						>
							{capitalize(UsersSort.CREATION)}
						</MenuItem>
					</Select>
				</FormControl>

				<ToggleButtonGroup
					size="small"
					color="standard"
					exclusive
					value={orderBy}
					onChange={(_, order: Order) =>
						onAction?.({
							type: UsersListToolbarActions.ORDER_BY,
							orderBy: order,
						})
					}
					disabled={disabled}
					sx={{ mr: 'auto' }}
				>
					<ToggleButton
						value={Order.DESCENDING}
						key={Order.DESCENDING}
						disabled={orderBy === Order.DESCENDING}
						title="Order Descending"
						data-testid="btn-orderby-descending"
					>
						<SortIcon />
					</ToggleButton>

					<ToggleButton
						value={Order.ASCENDING}
						key={Order.ASCENDING}
						disabled={orderBy === Order.ASCENDING}
						title="Order Ascending"
						data-testid="btn-orderby-ascending"
					>
						<SortIcon sx={{ transform: 'rotate(180deg)' }} />
					</ToggleButton>
				</ToggleButtonGroup>

				<Button
					sx={{ mr: 1 }}
					variant="outlined"
					size="small"
					color="inherit"
					disabled={disabled || !hasPreviousPage}
					startIcon={<NavigateBeforeIcon />}
					onClick={() =>
						onAction?.({ type: UsersListToolbarActions.PREVIOUS_PAGE })
					}
					data-testid="btn-page-previous"
				>
					Previous
				</Button>
				<Button
					color="inherit"
					variant="outlined"
					size="small"
					disabled={disabled || !hasNextPage}
					endIcon={<NavigateNextIcon />}
					onClick={() =>
						onAction?.({ type: UsersListToolbarActions.NEXT_PAGE })
					}
					data-testid="btn-page-next"
				>
					Next
				</Button>
			</Toolbar>
		</AppBar>
	);
};
