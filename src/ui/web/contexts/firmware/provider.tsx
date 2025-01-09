import { PropsWithChildren, useCallback, useState } from "react";
import { FirmwareCTX } from ".";
import FirmwareUseCase from "@interfaces/usecases/FirmwareUseCase";
import Pagination from "@models/pagination";
import Firmware from "@models/Firmware";
import { usePanic } from "../auth/hooks";

interface Props {
	usecase: FirmwareUseCase;
}

function FirmwareProvider({ usecase, children }: PropsWithChildren<Props>) {
	const [firmwares, setFirmwares] = useState<Pagination<Firmware>>();
	const panic = usePanic();

	const fetch = useCallback(async (queryParams?: Record<string, unknown>) => {
		setFirmwares(undefined);
		return usecase
			.fetch(queryParams)
			.then(setFirmwares)
			.catch((err) => {
				panic(err);
			});
	}, []);

	const findByID = useCallback((firmwareID: string) => {
		return usecase
			.findByID(firmwareID)
			.then((response) => response)
			.catch((err) => {
				panic(err);
				return undefined;
			});
	}, []);

	const create = useCallback(async (firmware: Firmware) => {
		let isCreated = false;
		try {
			isCreated = await usecase.create(firmware);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isCreated;
	}, []);

	const erase = useCallback(async (firmwareID: string) => {
		let isDeleted = false;
		try {
			isDeleted = await usecase.delete(firmwareID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isDeleted;
	}, []);

	const update = useCallback(async (firmware: Firmware) => {
		let isUpdated = false;
		try {
			isUpdated = await usecase.update(firmware);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isUpdated;
	}, []);

	const uploadFirmware = useCallback(
		async (groupID: string, file: File) => {
			let isUploaded = false;
			try {
				isUploaded = await usecase.uploadFirmware(groupID, file);
			} catch (err) {
				panic(err);
			}
			return isUploaded;
		},
		[]
	);

	return (
		<FirmwareCTX.Provider
			value={{
				fetch,
				firmwares,
				findByID,
				create,
				delete: erase,
				update,
				uploadFirmware
			}}
		>
			{children}
		</FirmwareCTX.Provider>
	);
}

export default FirmwareProvider;