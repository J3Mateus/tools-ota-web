import { DTO } from "@typing/index";
import { Model } from "../model";

class AuthCredentials extends Model {
	constructor(private _email: string, private _password: string) {
		super();
	}

	toJSON(): DTO {
		const dto: DTO = {};
		dto["email"] = this.email;
		dto["password"] = this.password;
		return dto;
	}

	static override fromJSON(json: DTO): AuthCredentials {
		const email = String(json["email"]);
		const password = String(json["password"]);
		return new AuthCredentials(email, password);
	}

	get email() {
		return this._email;
	}

	get password() {
		return this._password;
	}
}

export { AuthCredentials };