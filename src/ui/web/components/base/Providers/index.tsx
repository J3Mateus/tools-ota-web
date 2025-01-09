import { PropsWithChildren } from "react";
import NavigatorProvider, {
	NavigationProps,
} from "@web/contexts/common/navigator/provider";
import SideMenuProvider from "@web/contexts/common/sidemenu/provider";

function ApplicationProviders<BranchIdentifier extends string>({
	children,
	initialBranch,
	useAccountAsIdentifier,
}: PropsWithChildren<NavigationProps<BranchIdentifier>>) {
	return (
		<NavigatorProvider<BranchIdentifier>
			initialBranch={initialBranch}
			useAccountAsIdentifier={useAccountAsIdentifier}
		>
			<SideMenuProvider>{children}</SideMenuProvider>
		</NavigatorProvider>
	);
}

export { ApplicationProviders };