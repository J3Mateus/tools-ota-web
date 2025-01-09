import { PropsWithChildren, useCallback, useState } from "react";
import { UsersCTX } from ".";
import UsersUseCase from "@interfaces/usecases/UsersUseCase";
import { usePanic } from "../auth/hooks";
import Pagination from "@models/pagination";
import { Account } from "@models/auth";

interface Props {
	usecase: UsersUseCase;
}

function UsersProvider({ usecase, children }: PropsWithChildren<Props>) {
	const [users, setUsers] = useState<Pagination<Account>>();
	const panic = usePanic();

	const fetch = useCallback((queryParams?: Record<string, unknown>) => {
		setUsers(undefined);
		return usecase
			.fetch(queryParams)
			.then(setUsers)
			.catch((err) => {
				panic(err);
			});
	}, []);

	const create = useCallback(async (user: Account) => {
		let isCreated = false;
		try {
			isCreated = await usecase.create(user);
			if (isCreated) await fetch();
		} catch (err) {
			panic(err);
		}
		return isCreated;
	}, []);

	const erase = useCallback(async (userID: string) => {
		let isDeleted = false;
		try {
			isDeleted = await usecase.erase(userID);
			if (isDeleted) await fetch();
		} catch (err) {
			panic(err);
		}
		return isDeleted;
	}, []);

	const update = useCallback(async (user: Account) => {
		let isUpdated = false;
		try {
			isUpdated = await usecase.update(user);
			if (isUpdated) await fetch();
		} catch (err) {
			panic(err);
		}
		return isUpdated;
	}, []);

	return (
		<UsersCTX.Provider
			value={{
				fetch,
				users,
				erase,
				create,
				update,
			}}
		>
			{children}
		</UsersCTX.Provider>
	);
}

export default UsersProvider;