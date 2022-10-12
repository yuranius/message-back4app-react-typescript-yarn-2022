import React, {useContext, useEffect, useRef, useState} from 'react';
import Massages from "./Massages";
import {useDispatch, useSelector} from "react-redux";
import {
   AsyncAddMessageActionCreator,
   AsyncGetMessagesUserAction,
   AsyncGetUsersWhoHaveMessagesAction,
   changeUsersWhoHaveMessagesAction,
   isRedirectFromAnyPageAction,
   setCurrentUserAction,
} from "../../store/messageReducer";
import {currentDate} from "../../Utilits/getData";
import {stateMessageType, stateOverType, stateUserType} from "../../types/stateTypes";
import {UsersWhoHaveMassagesTypes} from "../../types/pageTypes";






const MessagesContainer = () => {
   const { userId } = useSelector((state:stateUserType) => state.user)
   const {users, messages, currentUser, isRedirectFromAnyPage} = useSelector((state:stateMessageType) => state.message)
   const {loading} = useSelector((state:stateOverType) => state.over)
   const [value , setValue] = useState('')
   const dispatch = useDispatch()

   // -modal
   const [show, setShow] = useState(false);
   // -modal


   // ?Для скролла
   const divRef: any = useRef(null);
   useEffect(() => {
      {messages.length && divRef.current.scrollIntoView()} //{behavior: 'smooth'} -- для плавного скролла
   }, [messages, currentUser])
   // ?Для скролла

   let messageHandler = (
       event:React.ChangeEvent<HTMLInputElement>
           & React.KeyboardEvent<HTMLInputElement>
   ) => {
      if(event.key === 'Enter'){
         addMassage()
      } else {
         setValue(event.target.value)
      }
   };

   let addMassage = () => {
      if(!value){
         //return setMassage('Поле не может быть пустым...')
      }
      if (value && userId && currentUser) {
         dispatch(AsyncAddMessageActionCreator({message:value, userToId:currentUser.id, userFromId:userId, login: currentUser.login, created_at:currentDate}) );
         //dispatch(AsyncChangeUsersWhoHaveMessagesAction(currentUser.id))
         dispatch(changeUsersWhoHaveMessagesAction(currentUser.id))
         setValue('')
      } else {
         //return setMassage('Ошибка!!!')
      }
   };




   //TODO надо разобраться с диспатчем "пустышек"


   // useEffect( () => {
   //    if (!!users[0]) {
   //       dispatch(setCurrentUserAction(users[0]))
   //    }
   // },[users[0]])



   useEffect( ()=> {
      if (userId && currentUser.id) {
         dispatch(AsyncGetMessagesUserAction({userId, friendsId: currentUser.id}))
      }
   },[userId,currentUser]) //

   useEffect( ()=> {
      if (userId && currentUser.id) {
         dispatch(AsyncGetMessagesUserAction({userId, friendsId: currentUser.id}))
      }
   },[])



   useEffect( ()=> {
      if (userId && !isRedirectFromAnyPage) {
         dispatch(AsyncGetUsersWhoHaveMessagesAction(userId))
      }
      return () => {
         dispatch(isRedirectFromAnyPageAction(false))
      };
   },[userId])

   const userHandler = (user:UsersWhoHaveMassagesTypes) => {
      dispatch(setCurrentUserAction(user))
      if (userId && currentUser.id) {
         dispatch(AsyncGetMessagesUserAction({userId, friendsId:currentUser.id}))
      }
      setShow(false)
   }





   


   return (
      <Massages
          userId={userId}
          currentUser={currentUser}
          userHandler={userHandler}
          users={users}
          addMassage={addMassage}
          messageHandler={messageHandler}
          messages={messages}
          value={value}
          loading={loading}
          show={show}
          setShow={setShow}
          divRef={divRef}
      />
   );
};

export default MessagesContainer;



