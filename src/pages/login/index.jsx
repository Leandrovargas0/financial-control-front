
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setErro(<Alert variant="danger">Usuário e senha obrigatório!</Alert>);
        } else {
            try {
                const parametros = {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: username, password: password })
                };
                fetch('http://localhost:8080/login', parametros)
                    .then((res) => res.json())
                    .then((res) => {
                        var token = res['token'];
                        console.log(token);
                        if (token != undefined) {
                            window.localStorage.setItem("token", token);
                            router.push('/');
                        }
                        else {
                            alert("Usuário ou senha incorretos.");
                        }
                    })
                    .catch((e) => alert("Usuário ou senha incorretos."));
            } catch (err) {
                setErro(<Alert variant="danger">{err}</Alert>);
            }
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                {erro}
                <Form.Group controlId="form-username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Digite seu usuário"
                        onChange={(e) => setUsername(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control type="password" placeholder="Digite a senha"
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Logar
                </Button>
            </Form>
        </Container>
    );
}