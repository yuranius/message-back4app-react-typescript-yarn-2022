import React from "react";
import {Button, ListGroup} from "react-bootstrap";
import {API_URL} from "../../../config";
import {FoundUsersItemTypes, UsersPropsTypes} from "../../../types/pageTypes";



export const FoundUsersItem:React.FC<FoundUsersItemTypes> = (props) => {
    return (
        <ListGroup.Item as="li" className='d-flex justify-content-between'>
            <div>
                <img src={!!props.avatar ? `${API_URL + props.avatar}` : props.defaultAvatar} alt="ava" className="rounded-circle" style={{width:50, height:50}}/>
                <span className='fw-bold mx-2'>{props.login}</span>
            </div>
            {(props.userId !== props.id) ?
                (<div className="collections-buttons">
                    {!props.friend ? (
                        <Button variant={'warning'} onClick={() => props.addFriend(props.id)}>
                            Добавить
                        </Button>
                    ) : (
                        <Button variant={'danger'}
                                onClick={() => props.deleteFriend(props.id)}>
                            Удалить
                        </Button>
                    )}
                    <Button variant={'outline-success'} className='mx-2' onClick={() => props.sendMessage(props)}>
                        Cообщение
                    </Button>
                </div>) : <div></div>
            }
        </ListGroup.Item>


)
    ;
};
