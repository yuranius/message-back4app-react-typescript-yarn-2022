import React, { useEffect, useRef, useState} from 'react';
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
import {todayDate} from "../../Utilits/getData";
import {stateMessageType, stateOverType, stateUserType} from "../../types/stateTypes";
import {UsersWhoHaveMassagesTypes} from "../../types/pageTypes";
import {setShowMessageAction} from "../../store/overReducer";






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
         event.preventDefault()
         addMassage()
      } else {
         setValue(event.target.value)
      }
   };

   let addMassage = () => {
      const currentDate = `${todayDate().dayName} | ${todayDate().time} | ${todayDate().date}`
      let gapChecking = /^\w+( \w+)*$/.test(value)


      if(!value){
         return setShowMessageAction({statusMessage: 2, message: 'Поле не может быть пустым'})
      }
      if (gapChecking && userId && currentUser) {
         dispatch(AsyncAddMessageActionCreator({message:value, userToId:currentUser.id, userFromId:userId, login: currentUser.login, created_at:currentDate}) );
         dispatch(changeUsersWhoHaveMessagesAction(currentUser.id))
         setValue('')
      } else {
         dispatch(setShowMessageAction({statusMessage: 2, message: 'Введите сообщение не содержащие пробелов в начале'}))
         setValue('')
      }
   };



   useEffect( ()=> {
      if (currentUser.id) {
         dispatch(AsyncGetMessagesUserAction({userId, friendsId: currentUser.id}))
      }
   },[dispatch, currentUser, userId])


   useEffect( ()=> {
      if (userId && !isRedirectFromAnyPage) {
         dispatch(AsyncGetUsersWhoHaveMessagesAction())
      }
      return () => {
         dispatch(isRedirectFromAnyPageAction(false))
      };
   },[dispatch, userId, isRedirectFromAnyPage])

   const userHandler = (user:UsersWhoHaveMassagesTypes) => {
      dispatch(setCurrentUserAction(user))
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



