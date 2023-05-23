import { User } from '@userscripters/stackexchange-api-types';

import { UserProfileCardActions } from './constants';

export interface UserProfileCardAction {
	type: UserProfileCardActions;
	userId: number;
}

export interface UserProfileCardProps {
	user: User;
	expanded?: boolean;
	onAction?: (action: UserProfileCardAction) => void;
}
