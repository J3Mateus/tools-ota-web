import { DTO } from "@typing/http";
import { Model } from "./model";

class Wifi extends Model {
    private _uuid: string;
    private _SSDI: string;
    private _password: string;
    private _isDeleted: boolean;

    constructor() {
        super();
        this._uuid = "";
        this._SSDI = "";
        this._password = "";
        this._isDeleted = false;
    }

    // Getters and Setters
    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }

    get SSDI(): string {
        return this._SSDI;
    }

    set SSDI(value: string) {
        this._SSDI = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get isDeleted(): boolean {
        return this._isDeleted;
    }

    set isDeleted(value: boolean) {
        this._isDeleted = value;
    }

    static fromJSON(json: DTO): Wifi {
        const obj = new Wifi();
        obj._uuid = String(json["uuid"]);
        obj._SSDI = String(json["SSDI"]);
        obj._password = String(json["password"]);
        obj._isDeleted = Boolean(json["is_deleted"]);
        return obj;
    }

    static fromJSONArray(jsonArray: DTO[]): Wifi[] {
        return jsonArray.map(json => Wifi.fromJSON(json));
    }

    toJSON(): DTO {
        const json = {} as DTO;
        json["uuid"] = this._uuid;
        json["SSDI"] = this._SSDI;
        json["password"] = this._password;
        json["is_deleted"] = this._isDeleted;
        return json;
    }

    static toJSONArray(wifis: Wifi[]): DTO[] {
        return wifis.map(wifi => wifi.toJSON());
    }

    static fromForm(dto: DTO): Wifi {
		const obj = new Wifi();
		if (dto["uuid"]) obj._uuid = String(dto["uuid"]);
		obj._SSDI = String(dto["SSDI"]);
        obj._password = String(dto['password'])
		return obj;
	}

}

export default Wifi;
