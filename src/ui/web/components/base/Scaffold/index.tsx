import { BrowserRouter } from "react-router-dom";
import { ApplicationProviders } from "@web/components/base/Providers";
import { PropsWithChildren } from "react";
import { NavigationProps } from "@web/contexts/common/navigator/provider";

function Scaffold<BranchIdentifier extends string>({
	children,
	initialBranch,
	useAccountAsIdentifier,
}: PropsWithChildren<NavigationProps<BranchIdentifier>>) {
	return (
		<BrowserRouter>
			<ApplicationProviders<BranchIdentifier>
				initialBranch={initialBranch}
				useAccountAsIdentifier={useAccountAsIdentifier}
			>
				{children}
			</ApplicationProviders>
		</BrowserRouter>
	);
}

export default Scaffold;