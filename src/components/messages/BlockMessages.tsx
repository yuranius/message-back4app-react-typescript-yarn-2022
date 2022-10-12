import React from 'react';
import MyMassages from "./MyMessages";
import PartnerMessages from "./PartnerMessages";
import TitleBlockMessages from "./TitleBlockMessages";
import FooterBlockMessages from "./FooterBlockMessages";
import {BlockMessagesPropsType} from "../../types/pageTypes";
import {Spinner} from "react-bootstrap";
import SmartSender from "./SmartSender";

const BlockMessages:
    React.FC<BlockMessagesPropsType> = ({
                                            value, setShow, messageHandler, addMassage,
                                            messages, userId, divRef, currentUser,
                                            loading}) => {
    return (
            <div className="aside__popup ">
                <div className="aside__popup-wrap">
                    <TitleBlockMessages currentUser={currentUser} setShow={setShow}/>
                    {/* сообщения */}
                    <div className="aside__popup-body">
                        {messages.length
                            ? (!loading
                                ? messages.map(message => {
                            if (message.user_from_id === userId) {
                                return <MyMassages key={message.id} message={message} />
                            } else if (message.user_from_id !== null){
                                return <PartnerMessages key={message.id} message={message} />}})
                                :   <div className='d-flex justify-content-center align-items-center' style={{height: '100%'}}>
                                        <Spinner animation="border" variant="primary" style={{width:50, height:50}} />
                                    </div> )
                            : <div className='d-flex justify-content-center align-items-center h-100 text-black-50'>У Вас пока нет сообщений...</div>}

                        {/*<SmartSender />*/}

                        {/*Для скролла вниз*/}
                        <div ref={divRef}/>

                        <div className="clearfix"></div>
                    </div>
                    {/* сообщения*/}
                    <FooterBlockMessages value={value} messageHandler={messageHandler} addMassage={addMassage}/>
                </div>
            </div>
    );
};

export default BlockMessages;