import { DTO } from "@typing/http";
import { Model } from "./model";
import Wifi from "./Wifi";
import Firmware from "./Firmware";

class Device extends Model {
    private _uuid: string;
    private _code: string;
    private _isDeleted: boolean;
    private _wifi?: Wifi;
    private _firmware?: Firmware;
    

    constructor() {
        super();
        this._uuid = "";
        this._code = "";
        this._isDeleted = false;
    }

    // Getters and Setters
    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }

    get code(): string {
        return this._code;
    }

    set code(value: string) {
        this._code = value;
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

    static fromJSON(json: DTO): Device {
        const obj = new Device();
        obj._uuid = String(json["uuid"]);
        obj._code = String(json["code"]);
        obj._isDeleted = Boolean(json["is_deleted"]);
        obj._firmware = json["firmware"] ? Firmware.fromJSON(json["firmware"] as DTO) : undefined;
        obj._wifi = json["wifi"] ? Wifi.fromJSON(json["wifi"] as DTO) : undefined;
        return obj;
    }

    static fromJSONArray(jsonArray: DTO[]): Device[] {
        return jsonArray.map(json => Device.fromJSON(json));
    }

    toJSON(): DTO {
        const json = {} as DTO;
        json["uuid"] = this._uuid;
        json["code"] = this._code;
        json["is_deleted"] = this._isDeleted;
        if (this._firmware) json["firmware"] = this._firmware.toJSON();
        if (this._wifi) json["wifi"] = this._wifi.toJSON();
        return json;
    }

    static toJSONArray(devices: Device[]): DTO[] {
        return devices.map(device => device.toJSON());
    }
}

export default Device;
