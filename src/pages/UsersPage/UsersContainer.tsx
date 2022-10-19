import React, {useEffect, useState} from "react";
import {FoundUsers} from "./Users";
import {useDispatch, useSelector} from "react-redux";
import {
	AsyncAddFriendAction,
	AsyncDeleteFriendAction,
	AsyncGetAllUsersAction,
} from "../../store/usersReducer";
import {useShowMessage} from "../../hooks/message.hook";
import {stateOverType, stateUsersType, stateUserType} from "../../types/stateTypes";
import {useSendMessageFromUserAndFriendsPage} from "../../hooks/sendMessageFromUserAndFriendsPage.hook";
import {setShowMessageAction} from "../../store/overReducer";


export const UsersContainer: React.FC = () => {
	const defaultAvatar = require('../../image/user-img.webp');
	let {users, pageNumber, pageSize, totalUsers, totalPages} = useSelector((state: stateUsersType) => state.users)
	let {userId} = useSelector((state: stateUserType) => state.user)
	let {loading, message} = useSelector((state: stateOverType) => state.over)
	const [searchUser, setSearchUser] = useState('')
	const [searchTimeout, setSearchTimeout] = useState(false)
	const dispatch = useDispatch()

	const {showWarning, variant, setShow, show} = useShowMessage()

	const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()
		let gapChecking	= /^\S*$/.test(event.target.value)

		if (!event.target.value) {
			setShow(false)
			dispatch(AsyncGetAllUsersAction({pageNumber, pageSize, userId}))
		}

		if (!gapChecking) {
			dispatch(setShowMessageAction({statusMessage: 0, message: 'Не должно быть пробелов'}))
			showWarning(message)
		} else {

			setShow(false)
			setSearchUser(event.target.value)
			if (searchTimeout !== false) {
				// @ts-ignore
				clearTimeout(searchTimeout)
			}
			// @ts-ignore
			setSearchTimeout(setTimeout((value) => {
				if (value) {
					//dispatch(AsyncFindUsersAction({userId, value, pageNumber: 1, pageSize}))
					dispatch(AsyncGetAllUsersAction({pageNumber, pageSize, userId, value}))
				}
			}, 500, event.target.value))
		}
	}


	// useEffect(() => {
	//     setShow(false)
	// }, [users])


	// useEffect(() => {
	//     setShow(false)
	//     userId && dispatch(AsyncGetAllUsersAction({pageNumber, pageSize, userId}))
	// }, [userId])

	useEffect(() => {
		dispatch(AsyncGetAllUsersAction({pageNumber, pageSize}))
	}, [])


	const onPageChanged = (page: number) => {

		if (searchUser) {
			dispatch(AsyncGetAllUsersAction({userId, value: searchUser, pageNumber: page, pageSize}))
		} else {
			dispatch(AsyncGetAllUsersAction({pageNumber: page, pageSize, userId}))
		}
	}


	let addFriend = (friendId: string) => {
		dispatch(AsyncAddFriendAction({userId, friendId}))
	};
	let deleteFriend = (friendId: string) => {
		dispatch(AsyncDeleteFriendAction({userId, friendId}))
	};


	// useEffect(() => {
	//     if (statusMessage === 2) {
	//         showWarning(message)
	//     } else if (statusMessage === 0) {
	//         showSuccess(message)
	//     }
	// }, [statusMessage, message])

	const {sendMessage} = useSendMessageFromUserAndFriendsPage();


	return <FoundUsers
			searchUser={searchUser}
			users={users}
			addFriend={addFriend}
			deleteFriend={deleteFriend}
			loading={loading}
			userId={userId}
			totalUsers={totalUsers}
			totalPages={totalPages}
			pageSize={pageSize}
			pageNumber={pageNumber}
			onPageChanged={onPageChanged}
			defaultAvatar={defaultAvatar}
			searchChangeHandler={searchChangeHandler}
			variant={variant}
			setShow={setShow}
			show={show}
			message={message}
			sendMessage={sendMessage}
	/>
};
