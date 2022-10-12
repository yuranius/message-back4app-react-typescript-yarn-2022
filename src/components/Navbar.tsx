import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AsyncLogoutUserAction} from "../store/authReducer";
import {getMessagesUserAction, getUsersWhoHaveMessagesAction, setCurrentUserAction} from "../store/messageReducer";
import {deleteShowMessageAction} from "../store/overReducer";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {API_URL} from "../config";
import {stateUserType} from "../types/stateTypes";
import {ILink} from "../types/pageTypes";


export const NavbarComponent:React.FunctionComponent = () => {

    const {userLogin, avatar} = useSelector((state:stateUserType) => state.user)

    const dispatch = useDispatch()

    interface eventType {
        preventDefault(): any,
    }





    const logoutHandler = (event:eventType, id:number):void => {
        if (id === 4) {
            event.preventDefault()
            dispatch(AsyncLogoutUserAction())
            dispatch(setCurrentUserAction({id: null, login: null, avatar: null, content:null, created_at: null,}))
            dispatch(getUsersWhoHaveMessagesAction([{ id: null, content: null,login: null, avatar: null, created_at: null}]))
            dispatch(deleteShowMessageAction())
            dispatch(getMessagesUserAction([{id: null, content: null, login: null, created_at: null, user_from_id: null}]))
        }
    }


    const navLinkItems:ILink[] =
        [
            {id: 1, to: '/users', title: '🔍 Поиск'},
            {id: 2, to: '/friends', title: '👬 Друзья'},
            {id: 3, to: '/messages', title: '📨 Сообщения'},
            {id: 4, to: '/auth', title: '📤 Выход'},
        ]


    const defaultAvatar = require('../image/user-img.webp');
    

    

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to='/profile'>
                        <img src={!!avatar ? `${API_URL + avatar}` : defaultAvatar} alt="аватарка"
                             className="navbar-ava mx-3"/>
                        {userLogin ? userLogin : 'Логин не определен'}
                    </Navbar.Brand>
                    <Nav>
                        {navLinkItems.map(link => <Nav.Link key={link.id} as={Link} to={link.to}
                                                            onClick={(event:eventType) => logoutHandler(event, link.id) }>{link.title}</Nav.Link>)}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};
