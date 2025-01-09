import { Model } from "../model";
import { DTO } from "@typing/index";

class AccountRole extends Model {
	constructor(
		private _id: string,
		private _name: string,
		private _code: string
	) {
		super();
	}

	toJSON(): DTO<unknown> {
		const json = {} as DTO;
		json["id"] = this._id;
		json["name"] = this._name;
		json["code"] = this._code;
		return json;
	}

	static fromJSON(json: Record<string, unknown>): AccountRole {
		const id = String(json["id"]);
		const name = String(json["name"]);
		const code = String(json["code"]);
		return new AccountRole(id, name, code);
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get code() {
		return this._code;
	}
}

export { AccountRole };