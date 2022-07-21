import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormEntrypay({ id }) {

    const [docNumber, setdocNumber] = useState("");
    const [titleValue, settitleValue] = useState("");
    const [dueDate, setdueDate] = useState("");
    const [emissionDate, setemissionDate] = useState("");
    const [company, setcompanyId] = useState("");
    const [customer, setcustomer] = useState("");

    const [companies, setCompanies] = useState([]);
    const [customers, setcustomers] = useState([]);

    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api(id == undefined ? '/entry-pay/new' : '/entry-pay');
    const api2 = new Api('/company');
    const api3 = new Api('/customer');

    useEffect(() => {
        try {
            api2.listar()
                .then((res) => setCompanies(res.data))
                .catch(err => setErro("Erro ao recuperar entidade!"));
        }
        catch (erro) { }

        try {
            api3.listar()
                .then((res) => setcustomers(res.data))
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
        setdocNumber(res.data['docNumber']);
        settitleValue((res.data['titleValue']).toString().replace(",", "."));
        setdueDate(res.data['dueDate']);
        setemissionDate(res.data['emissionDate']);


        setcustomer(res.data['customer']['id']);
        setcompanyId(res.data['company']['id']);
    }

    const setCompanySelected = (e) => {
        e.preventDefault();
        setcompanyId(e.target.value);
    }

    const setCustomerSelected = (e) => {
        e.preventDefault();
        setcustomer(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        settitleValue( titleValue.replace(",", ".") );

        try {
            const _entrypay = {
                id: id,
                docNumber: docNumber,
                titleValue: titleValue,
                dueDate: dueDate,
                emissionDate: emissionDate,
                company: {
                    id: company
                },
                customer:  {
                    id: customer
                },
            };

            api.salvar(_entrypay)
                .then(res => router.push('/entrypay'))
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
            <Form.Group controlId="docNumber">
                <Form.Label>Nº do Documento </Form.Label>
                <Form.Control name="docNumber" placeholder="Código/Nº do Documento"
                    required defaultValue={docNumber}
                    onChange={(e) => setdocNumber(e.target.value)}
                />
                <Form.Label>Valor a Receber</Form.Label>
                <Form.Control name="titleValue" placeholder="Valor do Título"
                    required defaultValue={titleValue}
                    onChange={(e) => settitleValue(e.target.value)}
                />
                <Form.Label>Data de Emissão</Form.Label>
                <Form.Control name="emissionDate" placeholder="AAAA-MM-DD"
                    required defaultValue={emissionDate}
                    onChange={(e) => setemissionDate(e.target.value)}
                />

                <Form.Label>Data de Vencimento</Form.Label>
                <Form.Control name="dueDate" placeholder="AAAA-MM-DD"
                    required defaultValue={dueDate}
                    onChange={(e) => setdueDate(e.target.value)}
                />

                <Form.Label>Empresa</Form.Label>
                <br />
                <Form.Select defaultValue={"Selecione"} size="lg" onChange={(e) => setCompanySelected(e)}>

                    <option value="Selecione">Selecione</option>
                    {companies.map((comp) => (
                        <option selected={comp.id == company}
                            key={comp.id}
                            value={comp.id}> {comp.corporateName} - {comp.cnpj}

                        </option>
                    ))}
                </Form.Select>


                <br />
                <Form.Label>Cliente</Form.Label>
                <br />
                <Form.Select defaultValue={"Selecione"} size="lg" onChange={(e) => setCustomerSelected(e)}>

                    <option value="Selecione">Selecione</option>
                    {customers.map((comp) => (
                        <option selected={comp.id == customer}
                            key={comp.id}
                            value={comp.id}> {comp.corporateName} - {comp.cnpjCpf}

                        </option>
                    ))}
                </Form.Select>

            </Form.Group>
            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/entrypay')}>
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


FormEntrypay.defaultProps = {
    id: undefined
};




