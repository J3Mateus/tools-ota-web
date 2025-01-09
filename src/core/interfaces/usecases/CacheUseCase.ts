import { Account, AuthResponse } from "@models/auth";

export default abstract class CacheUseCase {
	saveAuthResponse(_: AuthResponse): void {
		throw new Error('you must implement "saveAuthResponse"');
	}
	saveAccount(_: Account): void {
		throw new Error('you must implement "saveAccount"');
	}
	getAccount(): Account | undefined {
		throw new Error('you must implement "getAccount"');
	}
	getAccountToken(): string | undefined {
		throw new Error('you must implement "getAccountToken"');
	}
	clearAccount(): void {
		throw new Error('you must implement "clearAccount"');
	}
}