import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormAccountChart({ id }) {

    const [classification, setclassification] = useState("");
    const [accountType, setaccountType] = useState("");
    const [description, setdescription] = useState("");
    const [bank, setbank] = useState("");
    const [resourceEntry, setresourceEntry] = useState("");
    const [resourceDeparture, setresourceDeparture] = useState("");
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
        setclassification(res.data['classification']);
        setaccountType(res.data['accountType']);
        setdescription(res.data['description']);
        setbank(res.data['bank']);
        setresourceEntry(res.data['resourceEntry']);
        setresourceDeparture(res.data['resourceDeparture']);
        setbankAccount(res.data['bankAccount']);
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
        setbank(e.target.value);
    }

    const setInputOutput = (e) => {
        e.preventDefault();
        if (e.target.value == "entrada") {
            setresourceEntry("true");
            setresourceDeparture("false")
        }
        else {
            setresourceEntry("false");
            setresourceDeparture("true")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            
            if (bankAccount = "") {
                alert(bankAccount);
                if (contascadastradas != []) {
                    setbankAccount(contascadastradas[0]["id"]);
                }
            }

            if (resourceEntry == "") {
                setresourceEntry("1900-01-01");

            }

            if (resourceDeparture == "") {
                setresourceDeparture("1900-01-01");
            }

            if (accountType == "") {
                setaccountType("Analítico");
            }

            if (bank == "") {
                setbank("1");
            }

            const _bankAccount = {
                id: id,
                classification: classification,
                accountType: accountType,
                description: description,
                bank: bank,
                resourceEntry: resourceEntry,
                resourceDeparture: resourceDeparture,
                bankAccount: {
                    id: bankAccount,
                    classification: "",
                    description: "",
                    accountNumber: "",
                    agencyNumber: "",
                    inicialBalanceDate: "",
                    inicialBalance: "",
                    bank: "",
                    cnpjCompany: ""
                }
            };

            api.salvar(_bankAccount)
                .then(res => router.push('/account-chart'))
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
                <Form.Control name="description" placeholder="Descrição"
                    required defaultValue={description}
                    onChange={(e) => setdescription(e.target.value)}
                />


                <Form.Label>Característica da Conta</Form.Label>
                <br />
                <Form.Select defaultValue={"Caixa"} size="lg" onChange={(e) => setFeature(e)}>
                    <option selected={bank == "1"} value="1">Caixa</option>
                    <option selected={bank == "2"} value="2">Banco</option>
                    <option selected={bank == "3"} value="3">Cliente</option>
                    <option selected={bank == "4"} value="4">Fornecedor</option>
                </Form.Select>
                <br />


                { /* 
                <Form.Label>Entrada/Saída de Recurso</Form.Label>
                <br />
                <Form.Select defaultValue={"Entrada"} size="lg" onChange={(e) => setInputOutput(e)}>
                    <option selected={resourceEntry == "true"} value="entrada">Entrada</option>
                    <option selected={resourceDeparture == "true"} value="Saida">Saida</option>
                </Form.Select>
                <br />
  */ }



                <Form.Label>Entrada de Recurso</Form.Label>
                <Form.Control name="resourceEntry" placeholder="Entrada de Recurso"
                    required defaultValue={resourceEntry}
                    onChange={(e) => setresourceEntry(e.target.value)}
                />

                <Form.Label>Saída de Recurso</Form.Label>
                <Form.Control name="resourceDeparture" placeholder="Saída de Recurso"
                    required defaultValue={resourceDeparture}
                    onChange={(e) => setresourceDeparture(e.target.value)}
                />

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




