import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormAccountChart({ id }) {

    const [classification, setclassification] = useState("");
    const [accountType, setaccountType] = useState("");
    const [description, setdescription] = useState("");
    const [aspect, setaspect] = useState("");

    const [bankAccount, setbankAccount] = useState("");

    const [contascadastradas, setcontascadastradas] = useState([]);
    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api(id == undefined ? '/account-chart/new' : '/account-chart');
    const api2 = new Api('/bank-account');

    useEffect(() => {
        try {
            api2.listar()
                .then((res) => setcontascadastradas(res.data))
                .catch(err => setErro("Erro ao recuperar entidade!"));
        }
        catch (erro) {
        }

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
        console.log(res.data);
        setclassification(res.data['classification']);
        setaccountType(res.data['accountType']);
        setdescription(res.data['description']);
        setaspect(res.data['aspect']);
        setbankAccount(res.data['bankAccount']['id']);
    }

    const setAccountbankSelected = (e) => {
        e.preventDefault();
        setbankAccount(e.target.value);
    }

    const setAccountTypeAS = (e) => {
        e.preventDefault();
        setaccountType(e.target.value);
    }

    const setFeature = (e) => {
        e.preventDefault();
        setaspect(e.target.value);
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        try { 
            if (bankAccount == "") {
                if (contascadastradas != []) {
                    setbankAccount(contascadastradas[0]["id"]);
                }
            }

            if (accountType == "") {
                setaccountType("Analítico");
            }

        

            const _bankAccount = {
                id: id,
                classification: classification,
                accountType: accountType,
                description: description,
                aspect: aspect,
                bankAccount: {
                    id: bankAccount,
                }
            };

            api.salvar(_bankAccount)
                .then(res => router.push('/accountchart'))
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
            <Form.Group controlId="classification">
                <Form.Label>Classificação da conta (Nº) </Form.Label>
                <Form.Control name="classification" placeholder="Classificação"
                    required defaultValue={classification}
                    onChange={(e) => setclassification(e.target.value)}
                />

                <Form.Label>Tipo de Conta</Form.Label>
                <br />
                <Form.Select defaultValue={"Analítico"} size="lg" onChange={(e) => setAccountTypeAS(e)}>
                    <option selected={accountType == "Analítico"} value="Analítico">Analítico</option>
                    <option selected={accountType == "Sintético"} value="Sintético">Sintético</option>
                </Form.Select>
                <br />

                <Form.Label>Descrição</Form.Label>
                <Form.Control name="description" placeholder="Ex: Ativo, passivo, patrimônio líquido..."
                    required defaultValue={description}
                    onChange={(e) => setdescription(e.target.value)}
                />


                <Form.Label>Característica da Conta</Form.Label>
                <br />
                <Form.Select defaultValue={"1"} size="lg" onChange={(e) => setFeature(e)}>
                    <option selected={aspect == "1"} value="1">Caixa</option>
                    <option selected={aspect == "2"} value="2">Banco</option>
                    <option selected={aspect == "3"} value="3">Cliente</option>
                    <option selected={aspect == "4"} value="4">Fornecedor</option>
                </Form.Select>
                <br />

                
                <Form.Label>Conta Vinculada</Form.Label>
                <br />
                <Form.Select defaultValue={"Selecione"} size="lg" onChange={(e) => setAccountbankSelected(e)}>
                    <option value="Selecione">Selecione</option>
                    {contascadastradas.map((comp) => (
                        <option selected={comp.id == bankAccount}
                            key={comp.id}
                            value={comp.id}> {comp.description} - AG:{comp.agencyNumber} - CC:{comp.accountNumber}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/bankaccount')}>
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

FormAccountChart.defaultProps = {
    id: undefined
};




