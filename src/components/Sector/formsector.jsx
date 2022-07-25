import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormSector({ id }) {

    const [nameSector, setnameSector] = useState("");

    const [company, setcompanyId] = useState("");

    const [companies, setCompanies] = useState([]);
    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api(id == undefined ? '/sector/new' : '/sector');

    const api2 = new Api('/company');

    useEffect(() => {
        try {
            api2.listar()
                .then((res) => setCompanies(res.data))
                .catch(err => setErro("Erro ao recuperar entidade!"));
        }
        catch (erro) { }

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
        setnameSector(res.data['nameSector']);
        setcompanyId(res.data['company']['id']);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const fornecedor = {
                id: id,
                nameSector: nameSector,
                company: {
                    id: company
                },


            };

            console.log(fornecedor);

            api.salvar(fornecedor)
                .then(res => router.push('/sector'))
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
            <Form.Group controlId="nome">
                <Form.Label>Setor (NOME)</Form.Label>
                <Form.Control name="nameSector" placeholder="Nome (Setor)"
                    required defaultValue={nameSector}
                    onChange={(e) => setnameSector(e.target.value)}
                />


                <Form.Label>Empresa</Form.Label>
                <br />
                <Form.Select defaultValue={"Selecione"} size="lg" onChange={(e) => setcompanyId(e.target.value)}>

                    <option value="Selecione">Selecione</option>
                    {companies.map((comp) => (
                        <option selected={comp.id == company}
                            key={comp.id}
                            value={comp.id}> {comp.corporateName} - {comp.cnpj}

                        </option>
                    ))}
                </Form.Select>


            </Form.Group>

            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/sector')}>
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


FormSector.defaultProps = {
    id: undefined
};


