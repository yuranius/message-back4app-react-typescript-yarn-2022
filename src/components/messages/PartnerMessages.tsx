import React from 'react';
import {MessagePageProps} from "../../types/pageTypes";

const PartnerMessages:React.FC<MessagePageProps> = ({message}) => {
    return (
        <div className="popup-body__message-partner" >
            <div className="popup-body__message-content-partner">
                {message.content}
            </div>
            <div className="popup-body__date-break">
                {message.created_at}
            </div>
        </div>
    );
};

export default PartnerMessages;
