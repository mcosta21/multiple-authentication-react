import { AuthUser, User } from "./auth.model";

export interface IAuth {
    type: string;
    signIn: (authUser?: AuthUser) => void | User;
    signOut: () => void;
    isAuthenticated: () => Promise<boolean>;
    getUser: () => User | undefined;
}