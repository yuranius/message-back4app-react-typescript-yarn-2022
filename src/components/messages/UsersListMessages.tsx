import React from 'react';
import {ListGroup} from "react-bootstrap";
import {UserListMessagesPropsTypes} from "../../types/pageTypes";

const UsersListMessages: React.FC<UserListMessagesPropsTypes> = ({users, currentUser, userHandler }) => {
    return (
        <ListGroup bsPrefix={'list-group'}>
            {users.map(user => {
                return <ListGroup.Item
                    action
                    key={user.id}
                    active={user.id === currentUser.id}
                    className={user.id === currentUser.id ? "fw-bold" : ""}
                    onClick={() => userHandler(user)}
                    bsPrefix={'list-group-item'}
                    style={{cursor: 'pointer'}}
                >
                    <span>{user.login}</span>
                </ListGroup.Item>
            })}
        </ListGroup>
    );
};

export default UsersListMessages;