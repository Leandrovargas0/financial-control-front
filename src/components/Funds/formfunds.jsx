import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormFunds({ id }) {

    const [name, setName] = useState("");
    const [provento, setProvento] = useState("");
    const [erro, setErro] = useState(false);
    
    const router = useRouter();
    const api = new Api(id == undefined ? '/funds/new' : '/funds');

    useEffect(() => {
        try {
            if (id != undefined) {
                api.listar(id)
                    .then((res) => setCamposJson(res))
                    .catch(err => setErro("Erro ao recuperar entidade!"));
            }
        } catch (erro) {
            setErro("Erro ao recuperar entidade!");
        }
    }, [id]);

    const setCamposJson = (res) => {
        setName(res.data['name']);
        setProvento(res.data['provento']);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
      
        try {

            const _funds = {
                id: id,
                name: name,
                provento: provento,
            };

            api.salvar(_funds)
                .then(res => router.push('/funds'))
                .catch(err => {
                    if (err.response?.data) {
                        var msg = "Erro: ";
                        Object.entries(err.response?.data).forEach((v) => msg += v[0] + ": " + v[1]);
                        setErro(msg);
                    } else {
                        setErro(err);
                    }
                });
        } catch (error) {
            setErro("Erro ao salvar Verba!");
        }
    };

    return <Container>
        {erro}
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nome">
                <Form.Label>Nome da Verba</Form.Label>
                <Form.Control name="name" placeholder="Nome da Verba"
                    required defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Form.Label>1 - PROVENTO | 2-DESCONTO</Form.Label>
             
                <Form.Control name="provento" placeholder="1|2"
                    required defaultValue={provento}
                    onChange={(e) => setProvento(e.target.value)}
                />


            </Form.Group>

            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/funds')}>
                        Cancelar
                    </Button>
                </Col>
                <Col md="auto">
                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </Col>
            </Row>
        </Form>
    </Container>;
}


FormFunds.defaultProps = {
    id: undefined
};




