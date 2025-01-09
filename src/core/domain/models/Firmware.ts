import { DTO } from "@typing/http";
import { Model } from "./model";
import File from './File';
class Firmware extends Model {
    private _uuid: string;
    private _name: string;
    private _version: string;
    private _code: string;
    private _isDeleted?: boolean;
    private _useCode: boolean;
    private _file?: File;

    constructor() {
        super();
        this._uuid = "";
        this._name = "";
        this._version = "";
        this._code = "";
        this._isDeleted = undefined;
        this._useCode = false;
        this._file = new File();
    }

    // Getters and Setters
    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get version(): string {
        return this._version;
    }

    set version(value: string) {
        this._version = value;
    }

    get code(): string {
        return this._code;
    }

    set code(value: string) {
        this._code = value;
    }

    get isDeleted(): boolean | undefined {
        return this._isDeleted;
    }

    set isDeleted(value: boolean | undefined) {
        this._isDeleted = value;
    }

    get useCode(): boolean {
        return this._useCode;
    }

    set useCode(value: boolean) {
        this._useCode = value;
    }

    get file(): File | undefined {
        return this._file;
    }

    set file(value: File | undefined) {
        this._file = value;
    }

    static fromJSON(json: DTO): Firmware {
        const obj = new Firmware();
        obj._uuid = String(json["uuid"]);
        obj._name = String(json["name"]);
        obj._version = String(json["version"]);
        obj._code = String(json["code"]);
        obj._isDeleted = json["is_deleted"] !== undefined ? Boolean(json["is_deleted"]) : undefined;
        obj._useCode = json["use_code"] !== undefined ? Boolean(json["use_code"]) : false;
        obj._file = json["file"] ? File.fromJSON(json["file"] as DTO) : undefined;
        return obj;
    }

    static fromJSONArray(jsonArray: DTO[]): Firmware[] {
        return jsonArray.map(json => Firmware.fromJSON(json));
    }

    toJSON(): DTO {
        const json = {} as DTO;
        json["uuid"] = this._uuid;
        json["name"] = this._name;
        json["version"] = this._version;
        json["code"] = this._code;
        if (this._isDeleted !== undefined) json["is_deleted"] = this._isDeleted;
        if (this._useCode !== undefined) json["use_code"] = this._useCode;
        if (this._file !== undefined) json["file"] = this._file.toJSON();
        return json;
    }

    static toJSONArray(firmwares: Firmware[]): DTO[] {
        return firmwares.map(firmware => firmware.toJSON());
    }

    static fromForm(dto: DTO): Firmware {
        console.log(dto)
		const obj = new Firmware();
		if (dto["uuid"]) obj._uuid = String(dto["uuid"]);
		obj._name = String(dto["name"]);
        obj._version = String(dto['version'])
        obj._code = String(dto['code'])
        obj._useCode = dto["use_code"] !== undefined ? Boolean(dto["use_code"]) : false;
		return obj;
	}
}

export default Firmware;
