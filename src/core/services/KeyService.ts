import KeyAdapter from "@interfaces/adapters/KeyAdapter";
import KeyUseCase from "@interfaces/usecases/KeyUseCase";
import Key from "@models/Key";
import Pagination from "@models/pagination";

class KeySevice implements KeyUseCase {
	constructor(protected readonly adapter: KeyAdapter) {}

	async fetch(): Promise<Pagination<Key>> {
		return this.adapter.fetch();
	}

	async create(key: Key): Promise<boolean> {
		return await this.adapter.create(key);
	}

	async findByID(keyID: string): Promise<Key | undefined> {
		return await this.adapter.findByID(keyID);
	}

	async update(key: Key): Promise<boolean> {
		return await this.adapter.update(key);
	}

	async delete(keyID: string): Promise<boolean> {
		return await this.adapter.delete(keyID);
	}

}

export default KeySevice;