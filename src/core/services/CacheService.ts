import { Account, AuthResponse } from "@models/index";
import StorageController from "@cache/storage/StorageController";
import CacheUseCase from "@interfaces/usecases/CacheUseCase";

class CacheService implements CacheUseCase {
	saveAuthResponse(authResponse: AuthResponse): void {
		StorageController.set("token", authResponse.token);
	}

	saveAccount(account: Account): void {
		StorageController.setJSON("account", account.toJSON());
	}

	getAccount(): Account | undefined {
		const serializedAccount = StorageController.getJSON<
			Record<string, unknown>
		>("account", true);
		if (serializedAccount) return Account.fromJSON(serializedAccount);
		return undefined;
	}

	getAccountToken(): string | undefined {
		return StorageController.get("token");
	}

	clearAccount(): void {
		StorageController.removeAccount();
	}
}

export default CacheService;