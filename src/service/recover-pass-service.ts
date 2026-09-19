import { DUMMY_BASE_URL } from "../constants";
import type { RecoverPassForm, RecoveredUser } from "../types/recover-pass";

export const recoverPassApi = async (payload: RecoverPassForm): Promise<RecoveredUser> => {
    const res = await fetch(`${DUMMY_BASE_URL}/users/filter?key=username&value=${payload.username}`);
    const data = await res.json();

    const user = data.users?.[0];

    if (!user || user.email !== payload.email) {
        throw new Error('No user found with this username and email');
    }

    return user;
}