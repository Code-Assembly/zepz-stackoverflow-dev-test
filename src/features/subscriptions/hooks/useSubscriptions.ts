import { useState } from 'react';

import {
	SubscriptionStatus,
	Subscriptions,
	UserSubscription,
} from 'api/stackexchange/subscriptions';

const createSubscriptionMap = (subscriptions: UserSubscription[]) => {
	const subscriptionMap: Record<number, SubscriptionStatus | null> = {};

	subscriptions.forEach((userSub) => {
		subscriptionMap[userSub.user_id] = userSub.subscription;
	});

	return subscriptionMap;
};

export const useSubscriptions = (userIds: number[] = []) => {
	const [userSubscriptions, setUserSubscriptions] = useState<
		Record<number, SubscriptionStatus | null>
	>(createSubscriptionMap(Subscriptions.getSubscriptionStatus(userIds)));

	const followUser = (userId: number) => {
		Subscriptions.followUser(userId);

		const map = createSubscriptionMap(
			Subscriptions.getSubscriptionStatus(userIds)
		);
		setUserSubscriptions(map);
	};

	const blockUser = (userId: number) => {
		Subscriptions.blockUser(userId);

		const map = createSubscriptionMap(
			Subscriptions.getSubscriptionStatus(userIds)
		);
		setUserSubscriptions(map);
	};

	const clearSubscriptionsToUser = (userId: number) => {
		Subscriptions.clearSubscriptionsToUser(userId);

		const map = createSubscriptionMap(
			Subscriptions.getSubscriptionStatus(userIds)
		);
		setUserSubscriptions(map);
	};

	return [
		userSubscriptions,
		{ followUser, blockUser, clearSubscriptionsToUser },
	] as const;
};
