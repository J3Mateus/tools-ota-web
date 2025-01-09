import { DTO } from "@typing/http";
import { Model } from "./model";

class File extends Model {
    private _uuid: string;
    private _name: string;
    private _type: string;
    private _file: string;

    constructor() {
        super();
        this._uuid = "";
        this._name = "";
        this._type = "";
        this._file = "";
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

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get file(): string {
        return this._file;
    }

    set file(value: string) {
        this._file = value;
    }

    static fromJSON(json: DTO): File {
        const obj = new File();
        obj._uuid = String(json["uuid"]);
        obj._name = String(json["name"]);
        obj._type = String(json["type"]);
        obj._file = String(json["file"]);
        return obj;
    }

    static fromJSONArray(jsonArray: DTO[]): File[] {
        return jsonArray.map(json => File.fromJSON(json));
    }

    toJSON(): DTO {
        const json = {} as DTO;
        json["uuid"] = this._uuid;
        json["name"] = this._name;
        json["type"] = this._type;
        json["file"] = this._file;
        return json;
    }

    static toJSONArray(files: File[]): DTO[] {
        return files.map(file => file.toJSON());
    }

    static fromForm(dto: DTO): File {
        const obj = new File();
        if (dto["uuid"]) obj._uuid = String(dto["uuid"]);
        obj._name = String(dto["name"]);
        obj._type = String(dto["type"]);
        obj._file = String(dto["file"]);
        return obj;
    }
}

export default File;
