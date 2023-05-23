import React, { FC, useState } from 'react';

import AirIcon from '@mui/icons-material/Air';
import { Alert, Paper, Stack } from '@mui/material';

import {
	UserProfileCard,
	UserProfileCardAction,
	UserProfileCardActions,
} from '../UserProfileCard';

import { UsersListProps } from './types';

export const UsersList: FC<UsersListProps> = ({ users }) => {
	const [activeUserCard, setActiveUserCard] = useState<number | null>(null);

	const onUserProfileCardAction = (action: UserProfileCardAction) => {
		if (action.type === UserProfileCardActions.EXPAND) {
			if (activeUserCard === action.userId) {
				setActiveUserCard(null);
			} else {
				setActiveUserCard(action.userId);
			}
		}
	};

	if (!Array.isArray(users) || users.length === 0) {
		return (
			<Paper elevation={2} sx={{ width: '100%', p: 2 }}>
				<Alert icon={<AirIcon />} variant="outlined" severity="info">
					<em>Nothing to see here! No users found.</em>
				</Alert>
			</Paper>
		);
	}

	return (
		<Stack spacing={1}>
			{users.map((user) => (
				<UserProfileCard
					key={user.user_id}
					user={user}
					onAction={onUserProfileCardAction}
					expanded={user.user_id === activeUserCard}
				/>
			))}
		</Stack>
	);
};
