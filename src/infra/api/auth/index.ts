import { DTO } from "@typing/index";
import { Account, AuthResponse, AuthCredentials } from "@models/index";
import AuthAdapter from "@interfaces/adapters/AuthAdapter";
import BaseAPI from "..";

class AuthAPI extends BaseAPI implements AuthAdapter {
	async login(dto: AuthCredentials): Promise<AuthResponse> {
		const response = await this.client.post<DTO>(
			"/auth/token/login",
			dto.toJSON()
		);
		return AuthResponse.fromJSON(response.data);
	}

	async logout(): Promise<void> {
		await this.client.post("/auth/token/logout");
		this.clearAuthorization();
	}

	async findProfile(): Promise<Account> {
		const response = await this.client.get<DTO>("/auth/me");
		return Account.fromJSON(response.data);
	}

	saveAuthorization(token: string): void {
		this.client.defaults.headers.common[
			"Authorization"
		] = `Bearer ${token}`;
	}

	clearAuthorization(): void {
		delete this.client.defaults.headers.common["Authorization"];
	}
}

export default AuthAPI;