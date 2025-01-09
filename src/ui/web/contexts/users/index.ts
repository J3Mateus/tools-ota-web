import { Account } from "@models/auth";
import Pagination from "@models/pagination";
import { createContext } from "use-context-selector";

interface Props {
	fetch(queryParams?: Record<string, unknown>): Promise<void>;
	users?: Pagination<Account>;
	create(user: Account): Promise<boolean>;
	erase(userID: string): Promise<boolean>;
	update(user: Account): Promise<boolean>;
}

export const UsersCTX = createContext({} as Props);