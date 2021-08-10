import React, { useContext, useState } from 'react';
import { emailContext } from '../index';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from 'axios';


const ForgetPage = () => {

    const { state, dispatch } = useContext(emailContext);
    const [email, setEmail] = useState();
    const [matchFound, setMatchFound] = useState();
    const [notMatch, setNoMatch] = useState();

    const onsubmit = (e) => {
        e.preventDefault();
        const match = state.find((user) => user.email === email);
        if (match) {
            console.log(match);
            setMatchFound("The token was send to your email");
            setNoMatch('');
            axios.post('http://localhost:5000/sendmail', { email: match.email, id: match.id, secret: "itachi" })
                .then((res) => {
                    match.token = res.data.token;
                    dispatch({
                        type: "UPDATE",
                        payload: match
                    })
                    console.log(match);
                    console.log(state);
                });
        } else {
            setNoMatch("Your Email was invalid");
            setMatchFound('');
        }
    }

    return (
        <div className="center">
            {matchFound ? (<Alert variant="info" style={{ width: '400px', display: 'inline-block' }}>{matchFound}</Alert>) : ""}
            {notMatch ? (<Alert variant="warning" style={{ width: '400px', display: 'inline-block' }}>{notMatch}</Alert>) : ""}
            <Form onSubmit={(e) => { onsubmit(e) }}>
                <Form.Label style={{ padding: '10px' }}>Email</Form.Label>
                <Form.Control type="email" style={{ width: '250px', display: 'inline-block' }} onChange={(e) => { setEmail(e.target.value) }}></Form.Control>
                <br></br>
                <Button type="submit" size="sm">Submit</Button>
            </Form>
        </div>
    );
}

export default ForgetPage;