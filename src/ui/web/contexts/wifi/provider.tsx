import { PropsWithChildren, useCallback, useState } from "react";
import { WifiCTX } from ".";
import WifiUseCase from "@interfaces/usecases/WifiUseCase";
import Pagination from "@models/pagination";
import Wifi from "@models/Wifi";
import { usePanic } from "../auth/hooks";

interface Props {
	usecase: WifiUseCase;
}

function WifiProvider({ usecase, children }: PropsWithChildren<Props>) {
	const [wifis, setWifis] = useState<Pagination<Wifi>>();
	const panic = usePanic();

	const fetch = useCallback(async (queryParams?: Record<string, unknown>) => {
		setWifis(undefined);
		return usecase
			.fetch(queryParams)
			.then(setWifis)
			.catch((err) => {
				panic(err);
			});
	}, []);

	const findByID = useCallback((wifiID: string) => {
		return usecase
			.findByID(wifiID)
			.then((response) => response)
			.catch((err) => {
				panic(err);
				return undefined;
			});
	}, []);

	const create = useCallback(async (wifi: Wifi) => {
		let isCreated = false;
		try {
			isCreated = await usecase.create(wifi);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isCreated;
	}, []);

	const erase = useCallback(async (wifiID: string) => {
		let isDeleted = false;
		try {
			isDeleted = await usecase.delete(wifiID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isDeleted;
	}, []);

	const update = useCallback(async (wifi: Wifi) => {
		let isUpdated = false;
		try {
			isUpdated = await usecase.update(wifi);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isUpdated;
	}, []);

	return (
		<WifiCTX.Provider
			value={{
				fetch,
				wifis,
				findByID,
				create,
				delete: erase,
				update,
			}}
		>
			{children}
		</WifiCTX.Provider>
	);
}

export default WifiProvider;