import React from 'react';
import {API_URL} from "../../config";

import {TitleBlockMessagesPropsTypes} from "../../types/pageTypes";
import {Figure} from "react-bootstrap";
// @ts-ignore
import defaultAvatar from '../../image/user-img.webp'
// @ts-ignore
import burgerMenu from '../../image/burger.png'

const TitleBlockMessages:React.FC<TitleBlockMessagesPropsTypes> = ({currentUser, setShow}) => {
    return (
        <div className="aside__popup-header">
            <div className="popup__card">
                <figure className="popup__avatar">
                    <img src={!!currentUser.avatar ? `${API_URL + currentUser.avatar}` : defaultAvatar} alt='Аватарка'/>
                </figure>
                <h5 className="popup__text-primary">
                    {currentUser.login}
                </h5>
                <h4 className="popup__status">
                    <span className="popup__status-indicator"></span>
                    Не в сети
                </h4>
                <Figure bsPrefix={'figure'}>
                    <Figure.Image
                        width={50}
                        height={50}
                        alt="меню"
                        src={burgerMenu}
                        onClick={ () => setShow(true)}
                    />
                </Figure>
            </div>
        </div>
    );
};

export default TitleBlockMessages;