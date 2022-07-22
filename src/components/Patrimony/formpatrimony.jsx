import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormPatrimony({ id }) {

    const [namePatrimony, setnamePatrimony] = useState("");
    const [buyDate, setbuyDate] = useState("");
    const [valuePatrimony, setvaluePatrimony] = useState("");
    const [lifespan, setlifespan] = useState("");
    const [accountChart, setaccountChart] = useState("");

    const [companies, setCompanies] = useState([]);

    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api(id == undefined ? '/patrimony/new' : '/patrimony');
    const api2 = new Api('/account-chart');


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
        setnamePatrimony(res.data['namePatrimony']);
        setbuyDate(res.data['buyDate']);
        setvaluePatrimony((res.data['valuePatrimony']).toString().replace(",", "."));
        setlifespan(res.data['lifespan']);
        setaccountChart(res.data['accountChart']['id']);
    }

    const ExibeAspectoDeConta = (asp) => {
        if (asp == "1") { return "Caixa"; }
        if (asp == "2") { return "Banco"; }
        if (asp == "3") { return "Cliente"; }
        if (asp == "4") { return "Fornecedor"; }
        if (asp == "5") { return "Imoveis/Moveis"; }
      }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (accountChart == ""){
            alert ("selecione um plano de contas");
            return;
        }
        try {


            const _patrimony = {
                id: id,
                namePatrimony: namePatrimony,
                valuePatrimony: valuePatrimony.replace(",", "."),
                buyDate: buyDate,
                lifespan: lifespan,
                accountChart: {
                    id: accountChart
                },

            };

            api.salvar(_patrimony)
                .then(res => router.push('/patrimony'))
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
            <Form.Group controlId="docNumber">

                <Form.Label>Nome Patrimônio </Form.Label>
                <Form.Control name="valuePatrimony" placeholder="Nome"
                    required defaultValue={namePatrimony}
                    onChange={(e) => setnamePatrimony(e.target.value)}
                />
                <Form.Label>Valor/Preço</Form.Label>
                <Form.Control name="valuePatrimony" placeholder="Valor"
                    required defaultValue={valuePatrimony}
                    onChange={(e) => setvaluePatrimony(e.target.value)}
                />
                <Form.Label>Data Compra (AAAA-MM-DD)</Form.Label>
                <Form.Control name="buyDate" placeholder="AAAA-MM-DD"
                    required defaultValue={buyDate}
                    onChange={(e) => setbuyDate(e.target.value)}
                />

                <Form.Label>Vida útil (anos)</Form.Label>
                <Form.Control name="lifespan" placeholder="Anos"
                    required defaultValue={lifespan}
                    onChange={(e) => setlifespan(e.target.value)}
                />

                <Form.Label>Plano de Contas vinculado</Form.Label>
                <br />
                <Form.Select size="lg" defaultValue={"Selecione"}  onChange={(e) => setaccountChart(e.target.value)}>
                <option value="Selecione">Selecione</option>
                    {companies.map((comp) => (
                        <option selected={comp.id == accountChart}
                            key={comp.id}
                            value={comp.id}> {comp.description} - { ExibeAspectoDeConta(comp.aspect)}

                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/patrimony')}>
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


FormPatrimony.defaultProps = {
    id: undefined
};




