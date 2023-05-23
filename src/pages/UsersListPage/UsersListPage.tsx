import React, { FC } from 'react';

import { Box, Paper, Typography } from '@mui/material';

import useAxios from 'axios-hooks';

import { UsersResponseData, buildUsersRequest } from 'api/stackexchange/users';
import { UsersList, UsersListSkeleton } from 'features/userslist';

import { ErrorAlert } from './components/ErrorAlert';
import { PAGE_SIZE } from './constants';

export const UsersListPage: FC = () => {
	const [{ data, loading, error }] = useAxios<UsersResponseData>(
		buildUsersRequest({
			pagesize: PAGE_SIZE,
		})
	);

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
				}}
			>
				{content}
			</Box>
		</Box>
	);
};
