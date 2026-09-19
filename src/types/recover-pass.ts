export type RecoverPassForm = {
    username: string;
    email: string;
}

export type RecoveredUser = {
    id: number;
    username: string;
    email: string;
    password: string;
}