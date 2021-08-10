import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { Button, Form, Alert } from 'react-bootstrap';
import { emailContext } from '../index';

const SetNewPassword = () => {
    const { token, id } = useParams();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const { state, dispatch } = useContext(emailContext);
    const currentUser = state.find((user) => user.id === id);
    const [invalid, setInvalid] = useState();
    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Password was you entered above does not match")
        } else if (password === confirmPassword) {
            setError('');
            currentUser.password = password;
            currentUser.token = "";
            console.log("password change: ", currentUser);
            dispatch({
                type: "UPDATE",
                payload: currentUser
            })
            setMessage("Password was reseted");

        }
    }

    useEffect(() => {
        if (currentUser.token !== token) {
            setInvalid("invalid");
        } else {
            setInvalid("");
        }
    }, [])

    return (
        <div>
            {!invalid ? (
                <div className="center">
                    {message && <Alert variant="info" style={{ width: '400px', display: 'inline-block' }} >{message}</Alert>}
                    <Form onSubmit={(e) => { onSubmit(e) }}>
                        <Form.Label style={{ padding: '10px 10px 10px 40px' }}>New password</Form.Label>
                        <Form.Control type="password" style={{ width: '250px', display: 'inline-block' }} onChange={(e) => { setPassword(e.target.value) }}></Form.Control>
                        <br></br>
                        {error && <Form.Text id="warning">{error}</Form.Text>}
                        <br></br>
                        <Form.Label style={{ padding: '10px' }}>Conform password</Form.Label>
                        <Form.Control type="password" style={{ width: '250px', display: 'inline-block' }} onChange={(e) => { setConfirmPassword(e.target.value) }}></Form.Control>
                        <br></br>
                        <Button size="sm" type="submit">Submit</Button>
                    </Form>
                </div>
            ) : (
                <div className="center">
                    <Alert variant="warning" style={{ width: '400px', display: 'inline-block' }} >Token was invalid</Alert>
                </div>
            )
            }
        </div>
    );
}

export default SetNewPassword;