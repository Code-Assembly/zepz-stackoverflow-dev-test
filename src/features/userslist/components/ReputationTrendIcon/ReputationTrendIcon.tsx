import React, { FC } from 'react';

import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { lightGreen, orange } from '@mui/material/colors';

import { ReputationTrendIconProps } from './types';

export const ReputationTrendIcon: FC<ReputationTrendIconProps> = ({
	reputationChange,
}) => {
	if (reputationChange == null) return null;

	// Increase
	if (reputationChange > 0)
		return (
			<TrendingUpIcon fontSize="inherit" sx={{ color: lightGreen[800] }} />
		);

	// Decrease
	if (reputationChange < 0)
		return <TrendingDownIcon fontSize="inherit" sx={{ color: orange[900] }} />;

	// Stable
	return <TrendingFlatIcon fontSize="inherit" />;
};
