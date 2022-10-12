import React from "react";
import Paginator from "../../components/Paginator/Paginator";
import {Form, ListGroup} from "react-bootstrap";
import {FoundUsersItem} from "./UsersItem/UsersItem";
import AlertForm from "../../components/Alert";
import Loader from "../../components/loader";
import {UsersPropsTypes} from "../../types/pageTypes";




export const FoundUsers:React.FC<UsersPropsTypes> = (props) => {

    let pages = props.totalPages

    pages.toString().split(' ')


    let collocuterElements = (props.users && props.users.filter(user => user.id !== props.userId).map((u) =>
        <FoundUsersItem
            id={u.id}
            key={u.id}
            login={u.login}
            addFriend={props.addFriend}
            deleteFriend={props.deleteFriend}
            userId={props.userId}
            friend={u.friend}
            avatar={u.avatar}
            defaultAvatar={props.defaultAvatar}
            sendMessage={props.sendMessage}
        />))

    return (
        <div className="#">
            <h1 className='text-center'>Поиск собеседников</h1>

            <div className="card-content black-text">
                <Form className='d-flex justify-content-between'>
                    <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                            <Form.Control type="text"  required className='' style={{width:'50%'}} placeholder="Введите логин пользователя"
                                          onChange={(event:React.ChangeEvent<HTMLInputElement>) => props.searchChangeHandler(event)} value={props.searchUser}/>
                    </Form.Group>

                    <Form.Group className="mb-3 w-50" >
                        <AlertForm variant={props.variant} setShow={props.setShow}  heading={props.message} show={props.show}/>
                    </Form.Group>
                </Form>


                {props.users &&
                    <ListGroup as="ul">
                        {!props.loading ? collocuterElements : <Loader />}
                    </ListGroup>

                }
                {props.users && <Paginator totalItemsCount={props.totalUsers} pageSize={props.pageSize}
                                                 currentPage={props.pageNumber} onPageChanged={props.onPageChanged}/>}
            </div>
        </div>
    );
};
