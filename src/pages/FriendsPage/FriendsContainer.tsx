import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Friends} from "./Friends";
import {AsyncDelFriendAction, AsyncGetFriendsAction} from "../../store/friendsReducer";
import {Spinner} from "react-bootstrap";
import {useSendMessageFromUserAndFriendsPage} from "../../hooks/sendMessageFromUserAndFriendsPage.hook";
import {stateFriendsType, stateOverType, stateUserType} from "../../types/stateTypes";



export const FriendsContainer = () => {


	const dispatch = useDispatch()
	let {userId} = useSelector((state:stateUserType) => state.user)
	let {loading} = useSelector((state:stateOverType) => state.over)
	let {friends} = useSelector((state:stateFriendsType) => state.friends)


	let deleteFriend = (friendId:number) => {
		dispatch(AsyncDelFriendAction({userId, friendId}))
	};

	useEffect(() => {
		userId && dispatch(AsyncGetFriendsAction(userId))
	},[userId])

	useEffect(()=> {
	},[friends])

	const defaultAvatar = require('../../image/user-img.webp');
	
	const {sendMessage} = useSendMessageFromUserAndFriendsPage();

	if (loading) {
		return <div className='d-flex justify-content-center align-items-center' style={{height: window.innerHeight - 200}}>
			<Spinner animation="border" variant="primary" style={{width:100, height:100}} />
		</div>

	} else {

	return <Friends
		friends={friends}
		deleteFriend={deleteFriend}
		loading={loading}
		userId={userId}
		defaultAvatar={defaultAvatar}
		sendMessage={sendMessage}
	/>}
};
