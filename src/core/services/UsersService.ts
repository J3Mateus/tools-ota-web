import UsersAdapter from "@interfaces/adapters/UsersAdapter";
import UsersUseCase from "@interfaces/usecases/UsersUseCase";
import { Account } from "@models/auth";
import Pagination from "@models/pagination";

export default class UsersService implements UsersUseCase {
	constructor(protected readonly adapter: UsersAdapter) {}

	async fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Account>> {
		return await this.adapter.fetch(queryParams);
	}

	async create(user: Account): Promise<boolean> {
		return await this.adapter.create(user);
	}

	async erase(userID: string): Promise<boolean> {
		return await this.adapter.erase(userID);
	}

	async update(user: Account): Promise<boolean> {
		return await this.adapter.update(user);
	}
}