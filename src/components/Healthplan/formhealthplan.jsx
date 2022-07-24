import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormHealthPlan({ id }) {

    const [operadora, setOperadora] = useState("");
    const [codigoAns, setcodigoAns] = useState("");
    const [erro, setErro] = useState(false);
    
    const router = useRouter();
    const api = new Api(id == undefined ? '/healthplan/new' : '/healthplan');

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
        setOperadora(res.data['operadora']);
        setcodigoAns(res.data['codigoAns']);
        
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            const _healthPlan = {
                id: id,
                operadora: operadora,
                codigoAns:codigoAns
            };

            api.salvar(_healthPlan)
                .then(res => router.push('/healthplan'))
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
            setErro("Erro ao salvar Plano de Saúde!");
        }
    };

    return <Container>
        {erro}
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="operadora">
                <Form.Label>Nome da Operadora</Form.Label>
                <Form.Control name="operadora" placeholder="Nome da Operadora"
                    required defaultValue={operadora}
                    onChange={(e) => setOperadora(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="codigoAns">
                <Form.Label>Código ANS</Form.Label>
                <Form.Control name="codigoAns" placeholder="Código ANS"
                    required defaultValue={codigoAns}
                    onChange={(e) => setcodigoAns(e.target.value)}
                />
            </Form.Group>

            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/healthplan')}>
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


FormHealthPlan.defaultProps = {
    id: undefined
};




