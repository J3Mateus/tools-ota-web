import { DTO } from "@typing/index";
import { Model } from "../model";

class AuthResponse extends Model {
	constructor(private _token: string) {
		super();
	}

	toJSON(): DTO {
		throw new Error("Method not implemented.");
	}

	static fromJSON(json: DTO): AuthResponse {
		const token = String(json["access"]);
		return new AuthResponse(token);
	}

	get token(): string {
		return this._token;
	}
}

export { AuthResponse };