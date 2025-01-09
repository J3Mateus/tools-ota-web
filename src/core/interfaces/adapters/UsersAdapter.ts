import { Account } from "@models/auth";
import Pagination from "@models/pagination";

export default abstract class UsersAdapter {
	abstract fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Account>>;
	abstract create(user: Account): Promise<boolean>;
	abstract erase(userID: string): Promise<boolean>;
	abstract update(user: Account): Promise<boolean>;
}