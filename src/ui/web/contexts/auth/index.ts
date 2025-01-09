import { Account, AuthCredentials } from "@models/auth";
import { createContext } from "use-context-selector";

interface Props {
	account: undefined | Account;
	login(credentials: AuthCredentials): Promise<Account | undefined>;
	logout(): void;
	panic(err: unknown): boolean;
}

export const AuthCTX = createContext({} as Props);