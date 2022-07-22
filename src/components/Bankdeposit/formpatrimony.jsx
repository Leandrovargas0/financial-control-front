import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormPatrimony({ id }) {
    const [value, setvalue] = useState("");
    const [isDeposit, setisDeposit] = useState("");
    const [bankAccount, setbankAccount] = useState("");

    const [companies, setCompanies] = useState([]);

    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api(id == undefined ? '/bank-deposit/new' : '/bank-deposit');
    const api2 = new Api('/bank-account');


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
        setvalue((res.data['value']).toString().replace(",", "."));
        setisDeposit(res.data['isDeposit']);
        setbankAccount(res.data['bankAccount']['id']);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (accountChart == ""){
            alert ("selecione uma conta");
            return;
        }

        try {
            const _patrimony = {
                id: id,
                value: value.toString().replace(",", "."),
                isDeposit: isDeposit,
                bankAccount: {
                    id: bankAccount
                },
            };

            api.salvar(_patrimony)
                .then(res => router.push('/bankdeposit'))
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

                <Form.Label>Valor/Preço</Form.Label>
                <Form.Control name="value" placeholder="Valor"
                    required defaultValue={value}
                    onChange={(e) => setvalue(e.target.value)}
                />


                <Form.Label>(1- depódito | 2 retirada)</Form.Label>
                <Form.Control name="isDeposit" placeholder="1 ou 2"
                    required defaultValue={isDeposit}
                    onChange={(e) => setisDeposit(e.target.value)}
                />

                <Form.Label>Conta da Movimentação</Form.Label>
                <br />
                <Form.Select size="lg" defaultValue={"Selecione"} onChange={(e) => setbankAccount(e.target.value)}>

                <option value="Selecione">Selecione</option>
                    {companies.map((comp) => (
                        <option selected={comp.id == bankAccount}
                            key={comp.id}
                            value={comp.id}> {comp.description}-{comp.agencyNumber}-{comp.accountNumber}

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




