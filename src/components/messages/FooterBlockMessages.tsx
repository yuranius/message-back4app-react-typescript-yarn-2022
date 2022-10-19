import React from 'react';
import {FooterBlockMessagesPropsType} from "../../types/pageTypes";
// @ts-ignore
import sendMessage from '../../image/send-message.png'


const FooterBlockMessages:React.FC<FooterBlockMessagesPropsType> = ({value, messageHandler, addMassage}) => {
        return (
        <div className="aside__popup-footer">
            <div className="popup-footer__card">
                <div className="popup-footer__form-group">
                    <input
                        type="text"
                        placeholder='Введите сообщение...'
                        className="popup-footer__form-control"
                        value={value}
                        onChange={messageHandler}
                        onKeyDown={messageHandler}
                    />
                    <div className='popup-footer__image'>
                        <img src={sendMessage} alt="Отправить" onClick={addMassage}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterBlockMessages;