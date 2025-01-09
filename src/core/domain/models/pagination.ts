import { DTO } from "@typing/http";
import { Model } from "./model";

class Pagination<T extends Model> {
	private _limit: number;
	private _offset: number;
	private _count: number;
	private _next?: string;
	private _previous?: string;
	private _results: T[];

	constructor() {
		this._limit = 0;
		this._offset = 0;
		this._count = 0;
		this._next = "";
		this._previous = "";
		this._results = [];
	}

	static fromJSON<T extends Model>(
		json: DTO,
		itemFactory: (json: DTO) => T
	): Pagination<T> {
		const obj = new Pagination<T>();
		obj._limit = Number(json["limit"]);
		obj._offset = Number(json["offset"]);
		obj._count = Number(json["count"]);
		obj._next = String(json["next"]);
		obj._previous = String(json["previous"]);
		obj._results = (json["results"] as DTO[]).map(itemFactory);
		return obj;
	}

	get limit() {
		return this._limit;
	}

	get offset() {
		return this._offset;
	}

	get count() {
		return this._count;
	}

	get next() {
		return this._next;
	}

	get previous() {
		return this._previous;
	}

	get results() {
		return this._results;
	}
}

export default Pagination;