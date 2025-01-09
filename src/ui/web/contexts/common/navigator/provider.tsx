import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigatorCTX } from ".";
import {
	formatPathnameWithParams,
	getAllRoutePaths,
	getAllRoutesByBranch,
	getNavigationBranchs,
	getRouteByPath,
} from "@web/routes";
import { AccountRoleType, getAccountRoleByCode } from "@typing/account";
import { useAccount } from "@web/contexts/auth/hooks";

export interface NavigationProps<BranchIdentifier extends string | number> {
	initialBranch: BranchIdentifier;
	useAccountAsIdentifier?: boolean;
}

function NavigatorProvider<BranchIdentifier extends string | number = string>({
	children,
	initialBranch,
	useAccountAsIdentifier,
}: PropsWithChildren<NavigationProps<BranchIdentifier>>) {
	const [branchIdentifier, setBranchIdentifier] =
		useState<BranchIdentifier>(initialBranch);
	const account = useAccount();
	const navigate = useNavigate();
	const location = useLocation();
	const branches = getNavigationBranchs();
	const branch = branches[branchIdentifier];
	const pathname = location.pathname;
	const routes = getAllRoutesByBranch(branch);
	const paths = routes.map((route) => route.path);
	const formattedCurrentRoute = formatPathnameWithParams(
		pathname,
		getAllRoutePaths(branch)
	);
	const currentRouteProps = getRouteByPath(branch, formattedCurrentRoute);

	useEffect(() => {
		if (!useAccountAsIdentifier) return;
		if (!account) {
			changeBranchIdentifier(AccountRoleType.UNAUTH);
			return;
		}
		const accountRole = getAccountRoleByCode(account.role[0].code);
		changeBranchIdentifier(accountRole);
	}, [useAccountAsIdentifier, account]);

	useEffect(() => {
		if (!paths.includes(formattedCurrentRoute)) {
			navigate(branch.redirectPath);
		}
	}, [pathname, branchIdentifier]);

	let pageTitle = `Tools OTA${
		currentRouteProps ? ` - ${currentRouteProps.name}` : ""
	}`;
	if (document.title !== pageTitle) {
		document.title = pageTitle;
	}

	const changeBranchIdentifier = useCallback((identifier: unknown) => {
		const identifierExists = Object.keys(branches).includes(
			(identifier as BranchIdentifier).toString()
		);
		if (!identifierExists) {
			return;
		}
		setBranchIdentifier(identifier as BranchIdentifier);
	}, []);

	return (
		<NavigatorCTX.Provider
			value={{
				currentRoute: formattedCurrentRoute,
				groups: branch.groups,
				currentRouteProps,
				branchIdentifier,
				changeBranchIdentifier,
			}}
		>
			{children}
		</NavigatorCTX.Provider>
	);
}

export default NavigatorProvider;