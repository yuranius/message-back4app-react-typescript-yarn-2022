import React from "react"
import { Button, Card, Container, Form} from "react-bootstrap";
import AlertForm from "../../components/Alert";


type AuthPageProps = {
    changeHandler: React.FormEventHandler<HTMLElement>,
    loginHandler:React.MouseEventHandler<HTMLButtonElement>,
    registerHandler: React.MouseEventHandler<HTMLButtonElement>,
    loading:boolean,
    setShow(isShow: boolean): void,
    variant: string,
    message: string,
    show: boolean
}



export const AuthPage: React.FC<AuthPageProps> = ({changeHandler, loginHandler, registerHandler, loading, setShow, message, show, variant }) => {


    return (
        <Container className='d-flex justify-content-center align-items-center flex-column' style={{height: window.innerHeight - 100}}>
            <Card className='p-5'>
                <h1 style={{maxWidth:'100%', textAlign:"center"}}>Общайся 📨️, улыбайся 😃️, <br/> иди навстречу новому 🏆️!!!</h1>
                  <Form className='mt-5 m-auto' style={{width: 500}}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Электронная почта</Form.Label>
                        <Form.Control type="email" placeholder="Введите email..." onChange ={ changeHandler } />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароль..." onChange ={ changeHandler } />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Button
                            style={{marginRight:10}}
                            onClick={loginHandler}
                            disabled={loading}
                        >Войти</Button>
                        <Button
                            variant={"warning"}
                            onClick={registerHandler}
                            disabled={loading}
                        >Регистрация</Button>
                    </Form.Group>
                    <AlertForm variant={variant} setShow={setShow}  heading={message} show={show}/>
                </Form>
            </Card>
        </Container>
    )
}