import { User } from '@userscripters/stackexchange-api-types';

import { SubscriptionStatus } from 'api/stackexchange/subscriptions';

import { UserProfileCardActions } from './constants';

export interface UserProfileCardAction {
	type: UserProfileCardActions;
	userId: number;
}

export interface UserProfileCardProps {
	user: User;
	expanded?: boolean;
	subscription?: SubscriptionStatus | null;
	onAction?: (action: UserProfileCardAction) => void;
}
