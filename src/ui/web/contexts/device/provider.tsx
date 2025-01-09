import { PropsWithChildren, useCallback, useState } from "react";
import { DeviceCTX } from ".";
import DeviceUseCase from "@interfaces/usecases/DeviceUseCase";
import Pagination from "@models/pagination";
import Device from "@models/Device";
import { usePanic } from "../auth/hooks";

interface Props {
	usecase: DeviceUseCase;
}

function DeviceProvider({ usecase, children }: PropsWithChildren<Props>) {
	const [devices, setDevices] = useState<Pagination<Device>>();
	const panic = usePanic();

	const fetch = useCallback(async (queryParams?: Record<string, unknown>) => {
		setDevices(undefined);
		return usecase
			.fetch(queryParams)
			.then(setDevices)
			.catch((err) => {
				panic(err);
			});
	}, []);

	const findByID = useCallback((deviceID: string) => {
		return usecase
			.findByID(deviceID)
			.then((response) => response)
			.catch((err) => {
				panic(err);
				return undefined;
			});
	}, []);

	const create = useCallback(async (device: Device) => {
		let isCreated = false;
		try {
			isCreated = await usecase.create(device);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isCreated;
	}, []);

	const erase = useCallback(async (deviceID: string) => {
		let isDeleted = false;
		try {
			isDeleted = await usecase.delete(deviceID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isDeleted;
	}, []);

	const update = useCallback(async (device: Device) => {
		let isUpdated = false;
		try {
			isUpdated = await usecase.update(device);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isUpdated;
	}, []);

	const linkWifi = useCallback(async (deviceID: string, wifiID: string) => {
		let isLinked = false;
		try {
			isLinked = await usecase.linkWifi(deviceID, wifiID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isLinked;
	},[]);

	const linkFirmware = useCallback(async (deviceID: string, firmwareID: string) => {
		let isLinked = false;
		try {
			isLinked = await usecase.linkFirmware(deviceID, firmwareID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isLinked;
	},[]);

	const initializeOta = useCallback(async (deviceID: string) => {
		let isInitialized = false;
		try {
			isInitialized = await usecase.initializeOta(deviceID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isInitialized;
	},[]);

	return (
		<DeviceCTX.Provider
			value={{
				fetch,
				devices,
				findByID,
				create,
				delete: erase,
				update,
				linkWifi,
				linkFirmware,
				initializeOta,
			}}
		>
			{children}
		</DeviceCTX.Provider>
	);
}

export default DeviceProvider;