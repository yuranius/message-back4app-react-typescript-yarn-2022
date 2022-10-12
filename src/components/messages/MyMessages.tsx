import React from 'react';
import {MessagePageProps} from "../../types/pageTypes";


const MyMassages:React.FC<MessagePageProps> = ({message}) => {
    return (
        <div className="popup-body__message">
            <div className="popup-body__message-content">
                {message.content}
            </div>
            <div className="popup-body__date-break" >
                {message.created_at}
            </div>
        </div>
    );
};

export default MyMassages;