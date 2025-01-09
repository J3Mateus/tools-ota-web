import { Account, AuthCredentials } from "@models/index";
import AuthUseCase from "@interfaces/usecases/AuthUseCase";
import AuthAdapter from "@interfaces/adapters/AuthAdapter";
import CacheUseCase from "@interfaces/usecases/CacheUseCase";

class AuthService implements AuthUseCase {
	constructor(
		protected readonly adapter: AuthAdapter,
		protected readonly cacheUsecase: CacheUseCase
	) {
		const token = cacheUsecase.getAccountToken();
		if (token) {
			this.adapter.saveAuthorization(token);
		}
	}

	async login(credentials: AuthCredentials): Promise<Account> {
		const authResponse = await this.adapter.login(credentials);
		this.adapter.saveAuthorization(authResponse.token);
		const account = await this.adapter.findProfile().catch((err) => {
			this.adapter.clearAuthorization();
			throw err;
		});
		this.cacheUsecase.saveAuthResponse(authResponse);
		this.cacheUsecase.saveAccount(account);
		return account;
	}

	logout(): Promise<void> {
		this.cacheUsecase.clearAccount();
		return this.adapter.logout();
	}

	getCachedAccount() {
		return this.cacheUsecase.getAccount();
	}

	clearCachedAccount(): void {
		this.adapter.clearAuthorization();
		this.cacheUsecase.clearAccount();
	}
}

export default AuthService;