import React, { FC } from 'react';

import { Card, CardHeader, Skeleton, Stack } from '@mui/material';

import { UsersListSkeletonProps } from './types';

export const UsersListSkeleton: FC<UsersListSkeletonProps> = ({
	listSize = 3,
}) => {
	const skeletons = new Array(listSize).fill(0).map((_, index) => index);

	return (
		<Stack spacing={1}>
			{skeletons.map((s) => (
				<Card key={s}>
					<CardHeader
						avatar={<Skeleton variant="circular" width={40} height={40} />}
						title={
							<Skeleton
								variant="rectangular"
								width={'100%'}
								height={32}
								sx={{ mb: 0.5 }}
							/>
						}
						subheader={
							<Skeleton variant="rectangular" width={400} height={23} />
						}
					/>
				</Card>
			))}
		</Stack>
	);
};
