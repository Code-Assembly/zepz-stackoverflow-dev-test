import { PREFIX, SubscriptionStatus } from './constants';
import { UserSubscription } from './types';

/**
 * Retrieves the subscription status for the specified user IDs.
 * @param userIds - An array of user IDs.
 * @returns An array of UserSubscription objects containing the user ID and subscription status.
 */
export const getSubscriptionStatus = (userIds: number[]) => {
	return userIds.map((userId) => {
		const status = localStorage.getItem(`${PREFIX}${userId}`);

		return {
			user_id: userId,
			subscription: status,
		} as UserSubscription;
	});
};

/**
 * Subscribe to updates from this user
 * @param userId - The ID of the user to follow.
 */
export const followUser = (userId: number) => {
	localStorage.setItem(`${PREFIX}${userId}`, SubscriptionStatus.FOLLOWING);
};

/**
 * Block updates and interactions form this User
 * @param userId - The ID of the user to block.
 */
export const blockUser = (userId: number) => {
	localStorage.setItem(`${PREFIX}${userId}`, SubscriptionStatus.BLOCKED);
};

/**
 * Clears the subscription status of a user.
 * @param userId - The ID of the user for whom to clear the subscription.
 */
export const clearSubscriptionsToUser = (userId: number) => {
	localStorage.removeItem(`${PREFIX}${userId}`);
};
