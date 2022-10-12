import React from 'react';
import {Spinner} from "react-bootstrap";

const Loader = () => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{height: window.innerHeight - 200}}>
            <Spinner animation="border" variant="primary" style={{width:100, height:100}} />
        </div>
    );
};

export default Loader;