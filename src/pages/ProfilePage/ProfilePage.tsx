import React, {useEffect, useState} from "react";
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import AlertForm from "../../components/Alert";
import {ProfilePropsTypes} from "../../types/pageTypes";


export const ProfilePage:React.FC<ProfilePropsTypes> = (props) => {

    return (
        <Form className='mt-4'>
            <Row className="mb-3 flex-column" >
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label className='text-black-50'>Введите логин для изменения</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        onChange={props.inputHandler}
                        placeholder={props.userLogin}
                    />
                    <Form.Control.Feedback type='invalid'>{props.message}</Form.Control.Feedback>
                    {/*<Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>*/}
                    {props.showAlertInputText && <div className='mt-3' >
                        <AlertForm variant={props.variant} setShow={props.setShow} heading={props.message} show={props.show} />
                    </div>}
                    <Button onClick={props.saveHandler} disabled={props.loading} className='mt-3' variant={'warning'}>Сохранить логин</Button>
                </Form.Group>

                <Form.Group as={Col} md="9" className='mt-5'>
                    <Form.Label className='text-black-50'>Выберите файл изображения для аватара</Form.Label>
                    <div className='d-flex align-items-center'>
                        <Form.Control
                            type="file"
                            onChange={props.changeInputFileHandler}
                            value={props.inputFileValue}
                        />
                        {props.preview && <Image roundedCircle={true} thumbnail={true} className='mx-5' style={{width:100, height:100}} src={props.preview} alt="аватар" />}
                    </div>
                    {props.showAlertInputFile && <div className='mt-3' >
                        <AlertForm variant={props.variant} setShow={props.setShow} heading={props.message} show={props.show} />
                    </div>}
                    <Button onClick={props.saveAvatarHandler} disabled={props.loading} className='mt-3' variant={'warning'}>Сохранить аватар 📌</Button>
                </Form.Group>
            </Row>
        </Form>
    );
};
