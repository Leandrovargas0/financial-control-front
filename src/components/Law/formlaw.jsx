import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormLaw({ id }) {

    const [lawNumber, setlawNumber] = useState("");
    const [lawDescription, setlawDescription] = useState("");

    const [erro, setErro] = useState(false);
    const router = useRouter();

    const api = new Api(id == undefined ? '/law/new' : '/law');

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
        setlawNumber(res.data['lawNumber']);
        setlawDescription(res.data['lawDescription']);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const compania = {
                id: id,
                lawNumber: lawNumber,
                lawDescription: lawDescription
            };
            api.salvar(compania)
                .then(res => router.push('/law'))
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
            setErro("Erro ao salvar!");
        }
    };

    return <Container>
        {erro}
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="lawNumberr">
                <Form.Label>Nome Lei (N°/ano)</Form.Label>
                <Form.Control name="lawNumber" placeholder="ex: 11111/2019"
                    required defaultValue={lawNumber}
                    onChange={(e) => setlawNumber(e.target.value)}
                />
                <Form.Label>Texto ou Descrição</Form.Label>
                <Form.Control name="lawDescription" placeholder="Lei sobre Pesca"
                    required defaultValue={lawDescription}
                    onChange={(e) => setlawDescription(e.target.value)}
                />

            </Form.Group>

            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/company')}>
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

FormLaw.defaultProps = {
    id: undefined
};


