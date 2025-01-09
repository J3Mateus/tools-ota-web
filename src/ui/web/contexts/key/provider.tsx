import { PropsWithChildren, useCallback, useState } from "react";
import { KeyCTX } from ".";
import KeyUseCase from "@interfaces/usecases/KeyUseCase";
import Pagination from "@models/pagination";
import Key from "@models/Key";
import { usePanic } from "../auth/hooks";

interface Props {
	usecase: KeyUseCase;
}

function KeyProvider({ usecase, children }: PropsWithChildren<Props>) {
	const [keys, setKeys] = useState<Pagination<Key>>();
	const panic = usePanic();

	const fetch = useCallback(async (queryParams?: Record<string, unknown>) => {
		setKeys(undefined);
		return usecase
			.fetch(queryParams)
			.then(setKeys)
			.catch((err) => {
				panic(err);
			});
	}, []);

	const create = useCallback(async (key: Key) => {
		let isCreated = false;
		try {
			isCreated = await usecase.create(key);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isCreated;
	}, []);

	const findByID = useCallback(async (keyID: string) => {
		return usecase
		.findByID(keyID)
		.then((response) => response)
		.catch((err) => {
			panic(err);
			return undefined;
		});
	}, []);

	const update = useCallback(async (key: Key) => {
		let isUpdated = false;
		try {
			isUpdated = await usecase.update(key);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isUpdated;
	}, []);

	const erase = useCallback(async (groupID: string) => {
		let isDeleted = false;
		try {
			isDeleted = await usecase.delete(groupID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isDeleted;
	}, []);



	return (
		<KeyCTX.Provider
			value={{
				fetch,
				keys,
				create,
				findByID,
				update,
				delete:erase
			}}
		>
			{children}
		</KeyCTX.Provider>
	);
}

export default KeyProvider;