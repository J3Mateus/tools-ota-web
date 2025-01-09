import CacheService from "@services/CacheService";
import { AccountRoleType, getAccountRoleByCode } from "@typing/account";
import RouterSwitch from "@web/components/base/Router";
import Scaffold from "@web/components/base/Scaffold";
import AuthProvider from "@web/contexts/auth/provider";
import { ViteDIContainer } from "@web/dicontainer";
import "./globals.scss";
import { PropsWithChildren } from "react";
import { useAccount } from "@web/contexts/auth/hooks";
import AppConfigProvider from "@web/contexts/appconfig/provider";
import NotificationProvider from "@web/contexts/common/notification/provider";
import DeviceProvider from "@web/contexts/device/provider";
import FirmwareProvider from "@web/contexts/firmware/provider";
import GroupProvider from "@web/contexts/group/provider";
import WifiProvider from "@web/contexts/wifi/provider";
import UsersProvider from "@web/contexts/users/provider";
import KeyProvider from "@web/contexts/key/provider";


interface Props {
	showHeader?: boolean;
	showSideMenu?: boolean;
}

function AppConfigSetup({
	children,
	showHeader,
	showSideMenu,
}: PropsWithChildren<Props>) {
	const account = useAccount();
	showHeader = showSideMenu = account !== undefined;

	return (
		<AppConfigProvider showHeader={showHeader} showSideMenu={showSideMenu}>
			<UsersProvider usecase={ViteDIContainer.getUsersUseCase()}>
				<GroupProvider usecase={ViteDIContainer.getGroupUseCase()}>
					<DeviceProvider usecase={ViteDIContainer.getDeviceUseCase()}>
						<FirmwareProvider usecase={ViteDIContainer.getFirmwareUseCase()}>
							<WifiProvider usecase={ViteDIContainer.getWifiUseCase()}>
								<KeyProvider usecase={ViteDIContainer.getKeyUseCase()}>
									{children}
								</KeyProvider>
							</WifiProvider>
						</FirmwareProvider>
					</DeviceProvider>
				</GroupProvider>
			</UsersProvider>
		</AppConfigProvider>
	);
}

function App() {
	const cachedAccount = new CacheService().getAccount();
	const accountRoleCode = cachedAccount?.role[0].code ?? "UNAUTH";
	const initialAccountRoleType = getAccountRoleByCode(accountRoleCode);

	return (
		<NotificationProvider>
			<AuthProvider
				usecase={ViteDIContainer.getAuthUseCase()}
				cacheUsecase={ViteDIContainer.getCacheUsecase()}
			>
				<AppConfigSetup>
					<Scaffold<AccountRoleType>
						initialBranch={initialAccountRoleType}
						useAccountAsIdentifier
					>
						<RouterSwitch />
					</Scaffold>
				</AppConfigSetup>
			</AuthProvider>
		</NotificationProvider>
	);
}

export default App;