import React, {useEffect, useState} from "react"
import {AuthPage} from "./AuthPage";
import {useDispatch, useSelector} from "react-redux";
import {AsyncSetAuthUserAction, AsyncSetRegisterUserAction } from "../../store/authReducer";
import {deleteShowMessageAction} from "../../store/overReducer";
import {stateOverType} from "../../types/stateTypes";
import {useShowMessage} from "../../hooks/message.hook";



export const AuthPageContainer: React.FC = () => {

    const dispatch = useDispatch()

    const [form, setForm] = useState({email:"", password:""})


    const {loading, message} = useSelector((state:stateOverType) => state.over)

    const {showWarning, variant, setShow, show} = useShowMessage()



    // useEffect(() => {
    //     setShow(false)
    //     message && dispatch(deleteShowMessageAction())
    // },[])

    useEffect(() => {
        !!message && showWarning(message)
    }, [message])

    const changeHandler = (event:any) => {
        setShow(false)
        message && dispatch(deleteShowMessageAction())
        setForm({ ...form, [event.target.id]: event.target.value })
    }

    const registerHandler = () => {
        (message && !show) && setShow(true)
        dispatch(AsyncSetRegisterUserAction(form))
    }

    const loginHandler = () => {
        (message && !show) && setShow(true)
        dispatch(AsyncSetAuthUserAction(form))
    }


    

    return <AuthPage
        loginHandler={loginHandler}
        registerHandler={registerHandler}
        changeHandler={changeHandler}
        loading={loading}
        show={show}
        variant={variant}
        setShow={setShow}
        message={message}/>
}