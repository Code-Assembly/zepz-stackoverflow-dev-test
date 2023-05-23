import React, { FC } from 'react';

import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Typography,
} from '@mui/material';

import { decodeHTML } from 'entities';

import { ReputationTrendIcon } from '../ReputationTrendIcon';
import { UserBadges } from '../UserBadges';

import { UserProfileCardActions } from './constants';
import { UserProfileCardProps } from './types';

export const UserProfileCard: FC<UserProfileCardProps> = ({
	user,
	expanded = false,
	onAction,
}) => {
	const onClickToExpand = () => {
		if (onAction)
			onAction({ type: UserProfileCardActions.EXPAND, userId: user.user_id });
	};

	// Decode special characters (html entities) to display them correctly
	const decodedDisplayName = decodeHTML(user.display_name);

	const reputation = (
		<Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
			<ReputationTrendIcon reputationChange={user.reputation_change_month} />
			<Typography
				component="span"
				fontWeight="700"
				fontSize="inherit"
				sx={{ ml: 1, mr: 2 }}
				title="User reputation"
			>
				{user.reputation}
			</Typography>
			<UserBadges badgeCount={user.badge_counts} />
		</Box>
	);

	const cardHeader = (
		<CardHeader
			avatar={
				<Avatar alt={decodedDisplayName} src={user.profile_image}>
					{decodedDisplayName.charAt(0)}
				</Avatar>
			}
			title={
				<Typography component="h1" variant="h6" mb={0.5}>
					{decodedDisplayName}
				</Typography>
			}
			subheader={reputation}
		/>
	);

	return (
		<Card
			component="article"
			sx={{ display: 'flex', cursor: 'pointer' }}
			onClick={onClickToExpand}
		>
			{!expanded ? (
				cardHeader
			) : (
				<>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={user.profile_image}
						alt={decodedDisplayName}
					/>
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography component="h1" variant="h5">
								{decodedDisplayName}
							</Typography>
							{reputation}
						</CardContent>

						<CardActions>
							<Button size="small">Follow</Button>
							<Button size="small" color="warning">
								Block
							</Button>
						</CardActions>
					</Box>
				</>
			)}
		</Card>
	);
};
