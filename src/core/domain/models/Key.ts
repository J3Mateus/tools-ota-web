import { DTO } from "@typing/http";
import { Model } from "./model";
import { Account } from "./auth/Account";

class Key extends Model {
    private _id: string;
    private _user: Account;
    private _name: string;
    private _key: string;
    private _revokedAt: string;

    constructor() {
        super();
        this._id = "";
        this._user = new Account();
        this._key = "";
        this._revokedAt = "";
        this._name = ""
    }

    // Getters and Setters
    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get user(): Account {
        return this._user;
    }

    set user(value: Account) {
        this._user = value;
    }

    get key(): string {
        return this._key;
    }

    set key(value: string) {
        this._key = value;
    }

    get revokedAt(): string {
        return this._revokedAt;
    }

    set revokedAt(value: string) {
        this._revokedAt = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    static fromJSON(json: DTO): Key {
        const obj = new Key();
        obj._id = String(json["id"]);
        obj._name = String(json["name"]);
        obj._user = Account.fromJSON(json["user"] as DTO);
        obj._key = String(json["key"]);
        obj._revokedAt = String(json["revoked_at"]);
        return obj;
    }

    static fromJSONArray(jsonArray: DTO[]): Key[] {
        return jsonArray.map(json => Key.fromJSON(json));
    }

    toJSON(): DTO {
        const json = {} as DTO;
        json["id"] = this._id;
        json["name"] = this._name;
        json["user"] = this._user.toJSON();
        json["key"] = this._key;
        json["revoked_at"] = this._revokedAt;
        return json;
    }

    static toJSONArray(keys: Key[]): DTO[] {
        return keys.map(key => key.toJSON());
    }

    static fromForm(dto: DTO): Key {
        const obj = new Key();
        if (dto["id"]) obj._id = String(dto["id"]);
        obj._name = String(dto["name"]);
        if (dto["user"]) obj._user = Account.fromJSON(dto["user"] as DTO);
        obj._key = String(dto["key"]);
        obj._revokedAt = String(dto["revoked_at"]);
        return obj;
    }
}

export default Key;
