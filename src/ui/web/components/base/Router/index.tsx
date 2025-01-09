import { useCallback } from "react";
import { getAllRoutes } from "../../../routes";
import { Route as RouteModel } from "../../../routes/types";
import { Route, Routes } from "react-router-dom";
import Skeleton from "../Scaffold/Skeleton";

function RouterSwitch() {
	const routeGroups = getAllRoutes();
	const renderRoutes = useCallback((route: RouteModel) => {
		const subroutes: JSX.Element[] = [];
		if (route.page !== undefined) {
			subroutes.push(
				<Route
					key={`${route.name}-${route.path}-index`}
					index
					element={<route.page />}
				/>
			);
		}
		if (route.subroutes !== undefined) {
			subroutes.push(...route.subroutes.map(renderRoutes));
		}
		return (
			<Route key={`${route.name}-${route.path}`} path={route.path}>
				{subroutes}
			</Route>
		);
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Skeleton />}>
				{routeGroups.map(renderRoutes)}
			</Route>
		</Routes>
	);
}

export default RouterSwitch;