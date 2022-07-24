import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormBank({ id }) {

    const [nameBank, setnameBank] = useState("");
    const [febrabanCode, setfebrabanCode] = useState("");
    const [cnpj, setcnpj] = useState("");

    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api(id == undefined ? '/bank/new' : '/bank');

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
        setnameBank(res.data['nameBank']);
        setfebrabanCode(res.data['febrabanCode']);
        setcnpj(res.data['cnpj']);

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            const _bankAccount = {
                id: id,
                nameBank: nameBank,
                febrabanCode: febrabanCode,
                cnpj: cnpj
            };

            api.salvar(_bankAccount)
                .then(res => router.push('/bank'))
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
            setErro("Erro ao salvar Conta!");
        }
    };

    return <Container>
        {erro}
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nome">
                <Form.Label>Banco (Nome) </Form.Label>
                <Form.Control name="nameBank" placeholder="Classificação"
                    required defaultValue={nameBank}
                    onChange={(e) => setnameBank(e.target.value)}
                />
                <Form.Label>CNPJ</Form.Label>
                <Form.Control name="cnpj" placeholder="cnpj"
                    required defaultValue={cnpj}
                    onChange={(e) => setcnpj(e.target.value)}
                />

                <Form.Label>Código FEBRABAN</Form.Label>
                <Form.Control name="febrabanCode" placeholder="123"
                    required defaultValue={febrabanCode}
                    onChange={(e) => setfebrabanCode(e.target.value)}
                />
            </Form.Group>

            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/bank')}>
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


FormBank.defaultProps = {
    id: undefined
};




