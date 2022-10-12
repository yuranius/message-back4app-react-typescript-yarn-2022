import React from "react";
import {FoundUsersItem} from "../UsersPage/UsersItem/UsersItem";
import {Button, ListGroup} from "react-bootstrap";
import {FriendsPropsTypes} from "../../types/pageTypes";
import {addFriend} from "../../store/usersReducer";



export const Friends:React.FC<FriendsPropsTypes> = (props) => {


	let collocuterElements = ( props.friends && props.friends.map((friend) =>
		<FoundUsersItem
			id={friend.id}
			key={friend.id}
			login={friend.login}
			deleteFriend={props.deleteFriend}
			userId={props.userId}
			friend={friend.friend}
			defaultAvatar={props.defaultAvatar}
			avatar={friend.avatar}
			sendMessage={props.sendMessage}
			addFriend={addFriend}
		/>))

	return (
		<div className="#">
			<h1 className='text-center'>Мои друзья</h1>
			<ListGroup as="ul">
				{props.friends && <div>{collocuterElements}</div>}
				{/*   -пагинатор может и не нужен      */}
				{/*{props.collocuters &&  <Paginator totalItemsCount={props.totalUsers} pageSize={props.pageSize} currentPage={props.pageNumber} onPageChanged={props.onPageChanged}/> }*/}
			</ListGroup>
		</div>
	);
};

