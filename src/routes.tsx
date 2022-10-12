import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import React from "react";

import { ProfilePageContainer } from "./pages/ProfilePage/ProfilePageContainer";


import {UsersContainer} from "./pages/UsersPage/UsersContainer";
import {FriendsContainer} from "./pages/FriendsPage/FriendsContainer";
import MessagesContainer from "./pages/MassagePage/MassagesContainer";
import {AuthPageContainer} from "./pages/AuthPage/AuthPageContainer";


export const useRoutes = (token:string) => {
	if (!!token) {
		return (
			<Routes>
				<Route path='/' element={<MessagesContainer />} />
				<Route path="/users" element={ <UsersContainer />} />
				<Route path="/friends" element={<FriendsContainer />} />
				<Route path="/messages" element={<MessagesContainer />} />
				<Route path="/profile" element={<ProfilePageContainer />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		)
	}

	return (
		<>
		<Routes>
			<Route path="*" element={<Navigate to="/" />} />
			<Route path="/" element={<AuthPageContainer />} />
		</Routes>
		</>
	);
};
