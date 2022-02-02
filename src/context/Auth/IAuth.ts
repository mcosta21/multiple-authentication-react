import { AuthUser, User } from "./auth.model";

export interface IAuth {
    type: string;
    signIn: (authUser?: AuthUser) => Promise<void> | Promise<User>;
    signOut: () => void;
    isAuthenticated: () => Promise<boolean>;
    getUser: () => User | undefined;
}