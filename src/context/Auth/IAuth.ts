import { AuthUser, User } from "./auth.model";

export interface IAuth {
    type: string;
    signIn: (authUser?: AuthUser) => Promise<User | void>;
    signOut: () => void;
    isAuthenticated: () => Promise<boolean>;
    getUser: () => User | undefined;
}