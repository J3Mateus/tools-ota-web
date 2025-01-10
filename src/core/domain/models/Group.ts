import { DTO } from "@typing/http";
import { Model } from "./model";
import Firmware from "./Firmware";
import Wifi from "./Wifi";
import Device from "./Device";
import Key from "./Key";


class Group extends Model {
    private _uuid: string;
    private _name: string;
    private _active: boolean;
    private _isDeleted: boolean;
    private _firmware?: Firmware;
    private _wifi?: Wifi;
    private _key?: Key;
    private _device: Device[];

    constructor() {
        super();
        this._uuid = "";
        this._name = "";
        this._active = false;
        this._isDeleted = false;
        this._firmware = undefined;
        this._wifi = undefined;
        this._key = undefined;
        this._device = [];
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

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }

    get isDeleted(): boolean {
        return this._isDeleted;
    }

    set isDeleted(value: boolean) {
        this._isDeleted = value;
    }

    get firmware(): Firmware | undefined {
        return this._firmware;
    }

    set firmware(value: Firmware | undefined) {
        this._firmware = value;
    }

    get wifi(): Wifi | undefined {
        return this._wifi;
    }

    set wifi(value: Wifi | undefined) {
        this._wifi = value;
    }

    get device(): Device[] {
        return this._device;
    }

    set device(value: Device[]) {
        this._device = value;
    }

    get key(): Key | undefined {
        return this._key;
    }

    set key(value: Key | undefined) {
        this._key = value;
    }

    static fromJSON(json: DTO): Group {
        const obj = new Group();
        obj._uuid = String(json["uuid"]);
        obj._name = String(json["name"]);
        obj._active = Boolean(json["active"]);
        obj._isDeleted = Boolean(json["is_deleted"]);
        obj._key = json["api_key"] ? Key.fromJSON(json["api_key"] as DTO) : undefined
        obj._firmware = json["firmware"] ? Firmware.fromJSON(json["firmware"] as DTO) : undefined;
        obj._wifi = json["wifi"] ? Wifi.fromJSON(json["wifi"] as DTO) : undefined;
        obj._device = Device.fromJSONArray(json["device"] as DTO[] || []);
        return obj;
    }

    static fromJSONArray(jsonArray: DTO[]): Group[] {
        return jsonArray.map(json => Group.fromJSON(json));
    }

    toJSON(): DTO {
        const json = {} as DTO;
        json["uuid"] = this._uuid;
        json["name"] = this._name;
        json["active"] = this._active;
        json["is_deleted"] = this._isDeleted;
        if (this._firmware) json["firmware"] = this._firmware.toJSON();
        if (this._wifi) json["wifi"] = this._wifi.toJSON();
        if (this._key) json["api_key"] = this._key.toJSON();
        json["device"] = Device.toJSONArray(this._device);
        return json;
    }

    static toJSONArray(groups: Group[]): DTO[] {
        return groups.map(group => group.toJSON());
    }

    static fromForm(dto: DTO): Group {
		const obj = new Group();
		if (dto["uuid"]) obj._uuid = String(dto["uuid"]);
		obj._name = String(dto["name"]);
		return obj;
	}
}

export default Group;
