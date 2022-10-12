import { Routes, Route } from "react-router";
import  { Navigate }  from "react-router-dom";
import React from "react";
import { FriendsContainer } from "./FriendsPage/FriendsContainer";
import { ProfilePageContainer } from "./ProfilePage/ProfilePageContainer";
import {AuthPageContainer} from "./AuthPage/AuthPageContainer";
import {UsersContainer} from "./UsersPage/UsersContainer";
import MessagesContainer from "./MassagePage/MassagesContainer";


export const useRoute = (token) => {
	if (!!token) {
		return (
			<Routes>
				<Route path="/" element={ <MessagesContainer />}/>
				<Route path="/users" element={ <UsersContainer />}/>
				<Route path="/friends" exact element={<FriendsContainer />} />
				<Route path="/messages" exact element={<MessagesContainer />} />

				<Route path="/profile" element={<ProfilePageContainer />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		)
	}

	return (
		<>

		<Routes>
			<Route path="*" element={<Navigate to="/auth" />} />
			<Route path="/auth" element={<AuthPageContainer />} />
		</Routes>
		</>
	);
};
