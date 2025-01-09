import { Account } from "@models/auth";
import { AuthResponse } from "@models/auth/AuthResponse";
import { AuthCredentials } from "@models/auth/Credentials";

export default abstract class AuthAdapter {
	abstract login(credentials: AuthCredentials): Promise<AuthResponse>;
	abstract findProfile(): Promise<Account>;
	abstract logout(): Promise<void>;
	abstract saveAuthorization(token: string): void;
	abstract clearAuthorization(): void;
}