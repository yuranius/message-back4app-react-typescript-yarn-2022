import React, {useEffect, useState} from 'react'
import {ProfilePage} from './ProfilePage'
import {useDispatch, useSelector} from "react-redux";
import {AsyncChangeAvatarUserAction, AsyncChangeLoginUserAction} from "../../store/profileReducer";
import {deleteShowMessageAction} from "../../store/overReducer";
import {useShowMessage} from "../../hooks/message.hook";
import {useToggleShowAlert} from "../../hooks/toggleShowAlert.hook";
import {stateOverType, stateUserType} from "../../types/stateTypes";


let input = ''


export const ProfilePageContainer = () => {

    const {userId, userLogin} = useSelector((state: stateUserType) => state.user)
    const {loading, message, statusMessage} = useSelector((state: stateOverType) => state.over)
    const [login, setLogin] = useState(userLogin)
    const [file, setFile] = useState('')
    const [inputFileValue, setInputFileValue] = useState('')
    const [preview, setPreview] = useState('')
    const {showSuccess, showDanger, showWarning, variant, setShow, show} = useShowMessage()
    const {showAlert, showAlertInputText, showAlertInputFile} = useToggleShowAlert()
    const [input, setInput] = useState('')


    const dispatch = useDispatch()


    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
        setLogin(event.target.value)
        setShow(false)
    }

    useEffect(() => {
        dispatch(deleteShowMessageAction())
    }, [])


    const changeInputFileHandler = (event:any) => {
        setShow(false)

        let file = (event.target.files[0] as any)
        setFile(file)


        showAlert('inputFile')

        setInputFileValue(event.target.value)

        // проверка на валидность картинки
        if (!file.type.match('image')) {
            //очищаем поле input
            setInputFileValue('')
            setFile('')
            showWarning('Неправильный тип файла')

        } else {
            // показ превью
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (ev: any) => { // ProgressEvent<FileReader>
                setPreview(ev.target.result);
            }
        }
    }


    const saveHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        showAlert('inputText')

        if (userId && input) {
            dispatch(AsyncChangeLoginUserAction({userId, userLogin: input}))
            showSuccess(message)
            if (input) {
                setInput('')
            }
        } else if (!input) {
            showWarning('Поле не может быть пустым')
        } else {
            showDanger('Ошибка обработки запроса к базе данных')
        }
    }


    const saveAvatarHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setShow(false)
        showAlert('inputFile')
        event.preventDefault()
        if (!file) {
            return showWarning('Выберите файл')
        }
        try {
            let formData = new FormData();
            // @ts-ignore
            formData.append("userId", userId);
            formData.append("img", file);
            dispatch(AsyncChangeAvatarUserAction(formData));
            if (statusMessage === 0) {
                showSuccess(message)
            } else if (statusMessage === 1) {
                showWarning(message)
            } else {
                showDanger(message)
            }
            setInputFileValue('')
            setPreview('')
        } catch (error) {
            showDanger(message)
        }
    }


    useEffect(() => {
        if (statusMessage === 0) {
            showSuccess(message)
        } else if (statusMessage === 1) {
            showWarning(message)
        } else {
            showDanger(message)
        }
    }, [statusMessage])


    return <ProfilePage
        message={message}
        inputHandler={inputHandler}
        saveHandler={saveHandler}
        loading={loading}
        changeInputFileHandler={changeInputFileHandler}
        saveAvatarHandler={saveAvatarHandler}
        preview={preview}
        userLogin={userLogin}
        setShow={setShow}
        show={show}
        variant={variant}
        inputFileValue={inputFileValue}
        showAlertInputFile={showAlertInputFile}
        showAlertInputText={showAlertInputText}
    />
}
