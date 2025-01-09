import { PropsWithChildren, useCallback, useState } from "react";
import {
	Account as BaseAccount,
	AuthCredentials,
	AppError,
} from "@models/index";
import { AuthCTX } from ".";
import AuthUseCase from "@interfaces/usecases/AuthUseCase";
import { ERROR_MESSAGES } from "@language/error";
import CacheUseCase from "@interfaces/usecases/CacheUseCase";
import { useNotification } from "@web/contexts/common/notification/hooks";

interface AuthProviderProps {
	usecase: AuthUseCase;
	cacheUsecase: CacheUseCase;
}

function AuthProvider<Account extends BaseAccount>({
	children,
	usecase,
	cacheUsecase,
}: PropsWithChildren<AuthProviderProps>): JSX.Element {
	const notification = useNotification();
	const cachedAccount = cacheUsecase.getAccount() as Account;
	const [account, setAccount] = useState<Account | undefined>(cachedAccount);

	const login = useCallback(async (credentials: AuthCredentials) => {
		try {
			const account = await usecase.login(credentials);
			setAccount(account as Account);
			return account;
		} catch (error) {
			if (error instanceof AppError && error.isUnauthorized) {
				panic(error);
				return;
			}
			panic(error);
		}
		return undefined;
	}, []);

	const logout = useCallback(() => {
		usecase.clearCachedAccount();
		setAccount(undefined);
	}, []);

	const panic = useCallback((error: unknown): boolean => {
		const [message, shouldLogout] = treatError(error);
		if (import.meta.env.DEV) {
			console.error("ERROR:", error);
		}
		if (shouldLogout) {
			logout();
		}
		notification.error({
			message,
		});
		return shouldLogout;
	}, []);

	const treatError = useCallback((error: unknown): [string, boolean] => {
		if (!error) {
			return [ERROR_MESSAGES.UNEXPECTED, false];
		} else if (error instanceof AppError) {
			return [error.message, error.isUnauthorized];
		} else if (error instanceof Error && error.message) {
			return [error.message, false];
		}
		return [ERROR_MESSAGES.UNEXPECTED, false];
	}, []);

	return (
		<AuthCTX.Provider value={{ account, login, logout, panic }}>
			{children}
		</AuthCTX.Provider>
	);
}

export default AuthProvider;