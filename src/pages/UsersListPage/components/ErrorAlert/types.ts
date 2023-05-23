import { AxiosError } from 'axios';

import { ErrorResponseData } from 'api/stackexchange';

export interface ErrorAlertProps {
	error?: AxiosError<ErrorResponseData> | null;
}
