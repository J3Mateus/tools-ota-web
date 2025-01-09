type StorageKeys = "account" | "token";

export default class StorageController {
	private static readonly keys: Record<StorageKeys, string> = {
		account: "<TOOLS_OTA_WEB>@USER_DATA",
		token: "<TOOLS_OTA_WEB>@AUTH_TOKEN",
	};

	static set(
		key: StorageKeys,
		data: any,
		persistAfterSession: boolean = true
	): void {
		const storage = persistAfterSession ? localStorage : sessionStorage;
		storage?.setItem(StorageController.keys[key], data);
	}

	static setJSON(
		key: StorageKeys,
		data: any,
		persistAfterSession: boolean = true
	): void {
		data = JSON.stringify(data);
		const storage = persistAfterSession ? localStorage : sessionStorage;
		storage?.setItem(StorageController.keys[key], data);
	}

	static get<T = unknown>(
		key: StorageKeys,
		persistAfterSession: boolean = true
	): undefined | T {
		const storage = persistAfterSession ? localStorage : sessionStorage;
		let data: string | null | T = storage?.getItem(
			StorageController.keys[key]
		);
		if (!data || data === null) return undefined;
		return data as T;
	}

	static getJSON<T = unknown>(
		key: StorageKeys,
		persistAfterSession: boolean = true
	): undefined | T {
		const storage = persistAfterSession ? localStorage : sessionStorage;
		let data: string | null | T = storage?.getItem(
			StorageController.keys[key]
		);
		if (!data || data === null) return undefined;
		data = JSON.parse(data) as T;
		return data;
	}

	static removeAccount(): void {
		localStorage.removeItem(StorageController.keys.account);
		sessionStorage.removeItem(StorageController.keys.account);
		localStorage.removeItem(StorageController.keys.token);
		sessionStorage.removeItem(StorageController.keys.token);
	}

	static clear(): void {
		localStorage.clear();
		sessionStorage.clear();
	}
}