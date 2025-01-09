import { useContextSelector } from "use-context-selector";
import { UsersCTX } from ".";

export function useFetchUsers() {
	return useContextSelector(UsersCTX, (ctx) => ctx.fetch);
}

export function useUsers() {
	return useContextSelector(UsersCTX, (ctx) => ctx.users);
}

export function useEraseUser() {
	return useContextSelector(UsersCTX, (ctx) => ctx.erase);
}

export function useCreateUser() {
	return useContextSelector(UsersCTX, (ctx) => ctx.create);
}

export function useUpdateUser() {
	return useContextSelector(UsersCTX, (ctx) => ctx.update);
}