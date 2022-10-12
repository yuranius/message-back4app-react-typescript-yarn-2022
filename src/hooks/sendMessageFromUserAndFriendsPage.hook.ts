import {useDispatch} from "react-redux";
import {
    addUsersWhoHaveMessagesAction,
    isRedirectFromAnyPageAction,
    setCurrentUserAction
} from "../store/messageReducer";
import {useNavigate} from "react-router";
import {sendMessageType} from "../types/hookTypes";


export const useSendMessageFromUserAndFriendsPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sendMessage = ({id, login, avatar}:sendMessageType) => {
        dispatch(addUsersWhoHaveMessagesAction({id, login, avatar}))
        dispatch(setCurrentUserAction({id, login, avatar, created_at: 'test#1', content: 'test#2'}))
        dispatch(isRedirectFromAnyPageAction(true))
        navigate('/messages')
    }

    return {sendMessage}

}