import React, {useEffect, useState} from "react";
import {FoundUsers} from "./Users";
import {useDispatch, useSelector} from "react-redux";
import {
    AsyncAddFriendAction,
    AsyncDeleteFriendAction,
    AsyncFindUsersAction,
    AsyncGetAllUsersAction,
} from "../../store/usersReducer";
import {useShowMessage} from "../../hooks/message.hook";
import {stateOverType, stateUsersType, stateUserType} from "../../types/stateTypes";
import {useSendMessageFromUserAndFriendsPage} from "../../hooks/sendMessageFromUserAndFriendsPage.hook";


export const UsersContainer: React.FC = () => {
    const defaultAvatar = require('../../image/user-img.webp');
    let {users, pageNumber, pageSize, totalUsers, totalPages} = useSelector((state: stateUsersType) => state.users)
    let {userId} = useSelector((state: stateUserType) => state.user)
    let {loading, statusMessage, message} = useSelector((state: stateOverType) => state.over)
    const [searchUser, setSearchUser] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const dispatch = useDispatch()

    const {showWarning, showSuccess, variant, setShow, show} = useShowMessage()

    const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (!event.target.value) {
            // value может быть пробелом тоже запрос идет
            setShow(false)
            dispatch(AsyncGetAllUsersAction({pageNumber, pageSize, userId}))
        }
        setSearchUser(event.target.value)
        if (searchTimeout != false) {
            // @ts-ignore
            clearTimeout(searchTimeout)
        }
        // @ts-ignore
        setSearchTimeout(setTimeout((value) => {
            if (value) {
                dispatch(AsyncFindUsersAction({userId, value, pageNumber: 1, pageSize}))
            }
        }, 500, event.target.value))
    }


    useEffect(() => {
        setShow(false)
    }, [users])


    useEffect(() => {
        setShow(false)
        userId && dispatch(AsyncGetAllUsersAction({pageNumber, pageSize, userId}))
    }, [userId])


    const onPageChanged = (page: number) => {

        if (searchUser) {
            dispatch(AsyncFindUsersAction({userId, value: searchUser, pageNumber: page, pageSize}))
        } else {
            dispatch(AsyncGetAllUsersAction({pageNumber: page, pageSize, userId}))
        }
    }
    let addFriend = (friendId: number) => {
        dispatch(AsyncAddFriendAction({userId, friendId}))
    };
    let deleteFriend = (friendId: number) => {
        dispatch(AsyncDeleteFriendAction({userId, friendId}))

    };


    useEffect(() => {
        if (statusMessage === 2) {
            showWarning(message)
        } else if (statusMessage === 0) {
            showSuccess(message)
        }
    }, [statusMessage, message])

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
