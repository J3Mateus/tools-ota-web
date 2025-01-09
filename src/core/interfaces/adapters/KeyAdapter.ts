import Key from "@models/Key";
import Pagination from "@models/pagination";

abstract class KeyAdapter {
	abstract fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Key>>;
	abstract create(key: Key): Promise<boolean>;
	abstract findByID(keyID: string): Promise<Key | undefined>;
	abstract update(key: Key): Promise<boolean>;
	abstract delete(keyID: string): Promise<boolean>;
}

export default KeyAdapter;