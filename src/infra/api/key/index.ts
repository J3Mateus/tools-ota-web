import KeyAdapter from "@interfaces/adapters/KeyAdapter";
import Pagination from "@models/pagination";
import Key from "@models/Key";
import BaseAPI from "..";

class KeyAPI extends BaseAPI implements KeyAdapter {
	async fetch(): Promise<Pagination<Key>> {
		const response = await this.client.get("/user/get/api-key/list");
		return Pagination.fromJSON<Key>(response.data, Key.fromJSON);
	}

	async create(key: Key): Promise<boolean> {

		await this.client.post("/user/create/api-key",key.toJSON());
		return true;
	}

	async findByID(keyID: string): Promise<Key | undefined> {
		const response = await this.client.get(`/user/get/api-key/${keyID}`);
		return Key.fromJSON(response.data);
	}

	async update(key: Key): Promise<boolean> {
		await this.client.patch(`/user/update/api-key/${key.id}`, key.toJSON());
		return true;
	}

	async delete(keyID: string): Promise<boolean> {
		await this.client.delete(`/user/delete/api-key/${keyID}`);
		return true;
	}

}

export default KeyAPI;