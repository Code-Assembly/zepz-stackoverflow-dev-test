import React, { FC } from 'react';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box } from '@mui/material';
import { deepOrange, grey, yellow } from '@mui/material/colors';

import { SxStyles } from './styles';
import { UserBadgesProps } from './types';

export const UserBadges: FC<UserBadgesProps> = ({ badgeCount }) => {
	if (badgeCount == null) return null;

	return (
		<Box component="span" sx={{ display: 'inline-block' }}>
			{badgeCount.gold > 0 ? (
				<Box component="span" sx={SxStyles.badgeContainer} title="Gold Badges">
					<EmojiEventsIcon
						fontSize="inherit"
						sx={{ color: yellow['A700'], mr: 0.5 }}
					/>{' '}
					{badgeCount.gold}
				</Box>
			) : null}
			{badgeCount.silver > 0 ? (
				<Box
					component="span"
					sx={SxStyles.badgeContainer}
					title="Silver Badges"
				>
					<EmojiEventsIcon
						fontSize="inherit"
						sx={{ color: grey['A400'], mr: 0.5 }}
					/>{' '}
					{badgeCount.silver}
				</Box>
			) : null}
			{badgeCount.bronze > 0 ? (
				<Box
					component="span"
					sx={SxStyles.badgeContainer}
					title="Bronze Badges"
				>
					<EmojiEventsIcon
						fontSize="inherit"
						sx={{ color: deepOrange[800], mr: 0.5 }}
					/>
					{badgeCount.bronze}
				</Box>
			) : null}
		</Box>
	);
};
