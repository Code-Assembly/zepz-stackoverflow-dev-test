import React, { FC, MouseEvent } from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Divider,
	Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';

import { decodeHTML } from 'entities';

import { SubscriptionStatus } from 'api/stackexchange/subscriptions';

import { ReputationTrendIcon } from '../ReputationTrendIcon';
import { UserBadges } from '../UserBadges';

import { UserProfileCardActions } from './constants';
import { UserProfileCardProps } from './types';

export const UserProfileCard: FC<UserProfileCardProps> = ({
	user,
	expanded = false,
	subscription = SubscriptionStatus.FOLLOWING,
	onAction,
}) => {
	// State

	const isBlocked = subscription === SubscriptionStatus.BLOCKED;

	// Decode special characters (html entities) to display them correctly
	const decodedDisplayName = decodeHTML(user.display_name);

	// Event Handlers

	const onClickToExpand = () => {
		if (onAction)
			onAction({ type: UserProfileCardActions.EXPAND, userId: user.user_id });
	};

	const onClickToggleFollow = (event: MouseEvent) => {
		event.stopPropagation();
		if (onAction) {
			const type =
				subscription === SubscriptionStatus.FOLLOWING
					? UserProfileCardActions.UNFOLLOW_USER
					: UserProfileCardActions.FOLLOW_USER;

			onAction({
				type,
				userId: user.user_id,
			});
		}
	};

	const onClickToggleBlocked = (event: MouseEvent) => {
		event.stopPropagation();
		if (onAction) {
			const type =
				subscription === SubscriptionStatus.BLOCKED
					? UserProfileCardActions.UNBLOCK_USER
					: UserProfileCardActions.BLOCK_USER;

			onAction({
				type,
				userId: user.user_id,
			});
		}
	};

	// Templates

	const subscriptionIcon =
		subscription === SubscriptionStatus.FOLLOWING ? (
			<NotificationsIcon sx={{ color: green[500] }} />
		) : null;

	const followButtonLabel =
		subscription === SubscriptionStatus.FOLLOWING ? 'Unfollow' : 'Follow';

	const blockButtonLabel =
		subscription === SubscriptionStatus.BLOCKED ? 'unblock' : 'Block';

	const reputation = (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
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
				<Typography
					component="h1"
					variant="h6"
					color={isBlocked ? 'text.disabled' : 'text.primary'}
					sx={{ mb: 0.5, display: 'inline-flex', alignItems: 'center' }}
				>
					{subscriptionIcon} {decodedDisplayName}
				</Typography>
			}
			subheader={reputation}
		/>
	);

	// Component

	return (
		<Card
			component="article"
			sx={{
				display: 'flex',
				cursor: 'pointer',
				filter: isBlocked ? 'grayscale(100%)' : '',
			}}
			onClick={onClickToExpand}
		>
			{!expanded ? (
				cardHeader
			) : (
				<>
					<CardMedia
						component="img"
						sx={{
							width: 151,
						}}
						image={user.profile_image}
						alt={decodedDisplayName}
					/>

					<Divider orientation="vertical" flexItem sx={{ mr: 2 }} />

					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<CardContent sx={{ flex: '1 0 auto' }}>
							<Typography
								component="h1"
								variant="h5"
								color={isBlocked ? 'text.disabled' : 'text.primary'}
								sx={{ display: 'inline-flex', alignItems: 'center' }}
							>
								{subscriptionIcon} {decodedDisplayName}
							</Typography>
							{reputation}
						</CardContent>

						<CardActions>
							<Button
								size="small"
								disabled={isBlocked}
								onClick={onClickToggleFollow}
							>
								{followButtonLabel}
							</Button>
							<Button
								size="small"
								color="warning"
								onClick={onClickToggleBlocked}
							>
								{blockButtonLabel}
							</Button>
						</CardActions>
					</Box>
				</>
			)}
		</Card>
	);
};
