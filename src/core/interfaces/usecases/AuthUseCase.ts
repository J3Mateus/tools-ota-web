import { Account, AuthCredentials } from "@models/index";

export default abstract class AuthUseCase {
	abstract login(credentials: AuthCredentials): Promise<Account>;
	abstract logout(): Promise<void>;
	abstract getCachedAccount(): Account | undefined;
	abstract clearCachedAccount(): void;
}