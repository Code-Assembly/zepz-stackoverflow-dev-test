import { SxProps } from '@mui/material';

const alert: SxProps = {
	'& .MuiAlert-message': {
		flex: '1 1 100%',
	},
};

export const SxStyles = {
	alert,
} as const;
