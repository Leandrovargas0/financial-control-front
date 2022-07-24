import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormProfessions({ id }) {

    const [professionName, setprofessionName] = useState("");
    const [workload, setworkload] = useState("");
    const [erro, setErro] = useState(false);
    
    const router = useRouter();
    const api = new Api(id == undefined ? '/professions/new' : '/professions');

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
        setprofessionName(res.data['professionName']);
        setworkload(res.data['workload']);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            const _professions = {
                id: id,
                professionName: professionName,
                workload: workload,
            };

            api.salvar(_professions)
                .then(res => router.push('/professions'))
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
            setErro("Erro ao salvar Cargos!");
        }
    };

    return <Container>
        {erro}
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nome">
                <Form.Label>Cargo</Form.Label>
                <Form.Control name="professionName" placeholder="Nome do Cargo"
                    required defaultValue={professionName}
                    onChange={(e) => setprofessionName(e.target.value)}
                />
                <Form.Label>Carga Horária (Horas Mensais)</Form.Label>
                <Form.Control name="workload" placeholder="220"
                    required defaultValue={workload}
                    onChange={(e) => setworkload(e.target.value)}
                />
            </Form.Group>

            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/professions')}>
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


FormProfessions.defaultProps = {
    id: undefined
};




