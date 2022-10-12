import {useState} from "react";



export const useToggleShowAlert = () => {
    const [showAlertInputText, setShowAlertInputText] = useState(false)

    const [showAlertInputFile, setShowAlertInputFile] = useState(false)


    const showAlert = (show: string) => {
        if (show === 'inputText') {
            setShowAlertInputText(true)
            setShowAlertInputFile(false)
        } else if (show === 'inputFile'){
            setShowAlertInputText(false)
            setShowAlertInputFile(true)
        }
    }



    return {showAlert, showAlertInputText, showAlertInputFile}

}