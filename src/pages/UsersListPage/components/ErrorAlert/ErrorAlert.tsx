import React, { FC } from 'react';

import { Alert, AlertTitle, Paper, Typography } from '@mui/material';

import { SxStyles } from './styles';
import { ErrorAlertProps } from './types';

export const ErrorAlert: FC<ErrorAlertProps> = ({ error }) => {
	const errorData = error?.response?.data;

	const detailTitle =
		errorData != null
			? `${errorData.error_id} ${errorData.error_name}`
			: 'Error Description';

	return (
		<Alert severity="warning" sx={SxStyles.alert}>
			<AlertTitle>Error Loading User Data</AlertTitle>
			We where unable to load the user data at this time. Below is a detailed
			trace of the error message we received.
			{error != null ? (
				<Paper variant="outlined" sx={{ mt: 2, p: 1, background: 'none' }}>
					<strong>{detailTitle}</strong>
					<Typography component="pre" variant="caption">
						{error?.code} {error?.message}
						{errorData?.error_message != null ? (
							<Typography
								component="em"
								variant="caption"
								sx={{ display: 'block' }}
							>
								{errorData.error_message}
							</Typography>
						) : null}
					</Typography>
				</Paper>
			) : null}
		</Alert>
	);
};
