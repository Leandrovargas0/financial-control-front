import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormPaymentForm({ id }) {
    const [description, setdescription] = useState("");
    const [erro, setErro] = useState(false);
    const router = useRouter();
    const api = new Api(id == undefined ? '/payment-form/new' : '/payment-form');

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
        setdescription(res.data['description']);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            const _paymentForm = {
                id: id,
                description: description
            };

            api.salvar(_paymentForm)
                .then(res => router.push('/paymentform'))
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
            setErro("Erro ao salvar Forma De Pagament!");
        }
    };

    return <Container>
        {erro}
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="classification">
                <Form.Label>Descrição da Forma de Pagamento</Form.Label>
                <Form.Control name="description" placeholder="Descrição"
                    required defaultValue={description}
                    onChange={(e) => setdescription(e.target.value)}
                />
            </Form.Group>

            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/paymentform')}>
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

FormPaymentForm.defaultProps = {
    id: undefined
};




