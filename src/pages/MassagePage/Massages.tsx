import React from "react";
import "./Massages.css"
import {MessagesPageProps} from "../../types/pageTypes";
import {Button, Container, Modal} from "react-bootstrap";
import UsersListMessages from "../../components/messages/UsersListMessages";
import BlockMessages from "../../components/messages/BlockMessages";


const Messages:
    React.FC<MessagesPageProps> = ({messages, currentUser, users,
                                       userHandler, userId, value, messageHandler,
                                       addMassage, loading, show, setShow, divRef,
    }) => {

    return (
        <Container>
            <div className="col s12">
                <h1 className='text-center'>Сообщения</h1>
            </div>
            {users.length ? <div className="message-wrap">
                    <BlockMessages
                        messages={messages}
                        userId={userId}
                        loading={loading}
                        divRef={divRef}
                        currentUser={currentUser}
                        value={value}
                        messageHandler={messageHandler}
                        addMassage={addMassage}
                        setShow={setShow}
                    />
                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header>
                            <Modal.Title>Выбрать пользователя</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <UsersListMessages
                                users={users}
                                currentUser={currentUser}
                                userHandler={userHandler}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div> :
                <div>
                    <hr/>
                    <h3 className='text-center'>У Вас пока нет сообщений</h3>
                </div>}
        </Container>
    );
};
export default Messages;
