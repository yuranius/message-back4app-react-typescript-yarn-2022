import {useState} from "react";
import {setShowMessageAction} from "../store/overReducer";
import {useDispatch} from "react-redux";


export const useShowMessage = () => {
    const [show, setShow] = useState(false)
    const [variant, setVariant] = useState('')
    const dispatch = useDispatch()

    const showWarning = (message: string) => {
        dispatch(setShowMessageAction({statusMessage: 1, message}))
        setVariant('warning')
        setShow(true);
    }

    const showDanger = (message: string) => {
        dispatch(setShowMessageAction({statusMessage: 2, message}))
        setVariant('danger')
        setShow(true);
    }

    const showSuccess = (message: string) => {
        dispatch(setShowMessageAction({statusMessage: 0, message}))
        setVariant('success')
        setShow(true);
    }

    return {showWarning, showSuccess, showDanger, variant, show, setShow}

}