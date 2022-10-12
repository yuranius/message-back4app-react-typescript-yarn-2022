import React from 'react';
import {Alert} from "react-bootstrap";

type AlertProps = {
    variant: string,
    setShow(isShow: boolean): void,
    heading: string,
    show: boolean,
}


const AlertForm: React.FC<AlertProps> = ({variant, setShow, heading, show}): JSX.Element => {
    return (
        <>
            {show &&
                <Alert variant={variant} onClose={() => setShow(false)} dismissible>
                    <p>{heading}</p>
                </Alert>
            }
        </>
    );
};

export default AlertForm;