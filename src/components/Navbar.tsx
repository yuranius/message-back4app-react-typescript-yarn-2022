import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {stateUserType} from "../types/stateTypes";
import {ILink} from "../types/pageTypes";
import {AsyncLogoutUserAction, AsyncSetCheckLoginUserAction} from "../store/authReducer";
import {deleteShowMessageAction} from "../store/overReducer";


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
            dispatch(deleteShowMessageAction())
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
                        <img src={!!avatar ? avatar : defaultAvatar} alt="аватарка"
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
