import LoginPage from "../../pages/auth/login/login";
import { NavigationBranch } from "../types";
import { FaSignInAlt } from "react-icons/fa";

export const routes: NavigationBranch = {
	redirectPath: "/entrar",
	groups: [
		{
			name: "",
			routes: [
				{
					name: "Entrar",
					path: "/entrar",
					page: LoginPage,
					icon: FaSignInAlt({}),
				},
			],
		},
	],
};