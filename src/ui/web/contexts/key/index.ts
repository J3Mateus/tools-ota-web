import Key from "@models/Key";
import Pagination from "@models/pagination";
import { createContext } from "use-context-selector";

interface Props {
	fetch(queryParams?: Record<string, unknown>): Promise<void>;
	keys?: Pagination<Key>;
	create(key: Key): Promise<boolean>;
	findByID(keyID: string): Promise<Key | undefined>;
	update(key: Key): Promise<boolean>;
	delete(keyID: string): Promise<boolean>;
}

export const KeyCTX = createContext({} as Props);