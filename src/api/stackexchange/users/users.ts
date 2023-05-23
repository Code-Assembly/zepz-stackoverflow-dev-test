import { AxiosRequestConfig } from 'axios';

import {
	CommonWrapperObject,
	User,
} from '@userscripters/stackexchange-api-types';

import { Order } from 'api/stackexchange';

import { BASE_URL, STACK_OVERFLOW } from '../constants';

export const enum UsersSort {
	// reputation
	REPUTATION = 'reputation',
	// creation_date
	CREATION = 'creation',
	// display_name
	NAME = 'name',
	// last_modified_date
	MODIFIED = 'modified',
}

export interface UsersRequestParams {
	page?: number;
	pagesize?: number;
	order?: Order;
	fromdate?: number;
	todate?: number;
	min?: number;
	max?: number;
	sort?: UsersSort;
	inname?: string;
}

export type UsersResponseData = CommonWrapperObject<User>;

export const buildUsersRequest = (params: UsersRequestParams) => {
	const request: AxiosRequestConfig<UsersResponseData> = {
		url: '/users',
		method: 'GET',
		baseURL: BASE_URL,
		params: {
			site: STACK_OVERFLOW,
			...params,
		},
	};

	return request;
};
