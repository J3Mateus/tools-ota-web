import { NavigationBranch } from "./types";
import { routes as UnAuthRoutes } from "./roles/unauth-routes";
import { routes as AdminRoutes } from "./roles/admin-routes";

import { AccountRoleType } from "@typing/account/AccountRoleTypes";

export const namedBranchs: Readonly<Record<string | number, NavigationBranch>> =
	{
		[AccountRoleType.UNAUTH]: UnAuthRoutes,
		[AccountRoleType.ADMIN]: AdminRoutes,
	};