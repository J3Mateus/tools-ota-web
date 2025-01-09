enum AccountRoleType {
	UNAUTH = "unauth",
	ADMIN = "admin",
	TEACHER = "teacher",
	AGENT = "agent",
}

export function getAccountRoleByCode(roleKey?: string) {
	roleKey = roleKey?.toUpperCase();
	switch (roleKey) {
		case "ADMIN":
			return AccountRoleType.ADMIN;
		case "TEACHER":
			return AccountRoleType.TEACHER;
		case "AGENT":
			return AccountRoleType.AGENT;
		default:
			return AccountRoleType.UNAUTH;
	}
}

export function getAccountRoleKeyByName(roleName: string) {
	return (
		Object.entries(AccountRoleType).find(
			(item) => item[1] === roleName
		)?.[0] ?? "UNAUTH"
	);
}

export { AccountRoleType };