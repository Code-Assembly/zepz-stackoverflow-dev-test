import React, { FC, useState } from 'react';

import AirIcon from '@mui/icons-material/Air';
import { Alert, Paper, Stack } from '@mui/material';

import { useSubscriptions } from 'features/subscriptions';

import {
	UserProfileCard,
	UserProfileCardAction,
	UserProfileCardActions,
} from '../UserProfileCard';

import { UsersListProps } from './types';

export const UsersList: FC<UsersListProps> = ({ users }) => {
	const [activeUserCard, setActiveUserCard] = useState<number | null>(null);

	const [subscriptions, { followUser, blockUser, clearSubscriptionsToUser }] =
		useSubscriptions(users?.map((u) => u.user_id));

	const onUserProfileCardAction = (action: UserProfileCardAction) => {
		switch (action.type) {
			case UserProfileCardActions.EXPAND:
				if (activeUserCard === action.userId) {
					setActiveUserCard(null);
				} else {
					setActiveUserCard(action.userId);
				}
				break;

			case UserProfileCardActions.FOLLOW_USER:
				followUser(action.userId);
				break;

			case UserProfileCardActions.BLOCK_USER:
				blockUser(action.userId);
				break;

			case UserProfileCardActions.UNBLOCK_USER:
			case UserProfileCardActions.UNFOLLOW_USER:
				clearSubscriptionsToUser(action.userId);
				break;
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
					subscription={subscriptions[user.user_id] ?? null}
					expanded={user.user_id === activeUserCard}
				/>
			))}
		</Stack>
	);
};
