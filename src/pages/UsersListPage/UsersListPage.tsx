import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';

export const UsersListPage: FC = () => {
	const content = null;

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
