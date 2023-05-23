import { SubscriptionStatus } from './constants';

export interface UserSubscription {
	user_id: number;
	subscription: SubscriptionStatus | null;
}
