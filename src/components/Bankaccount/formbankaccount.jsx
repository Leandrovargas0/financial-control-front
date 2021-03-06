import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormBankAccount({ id }) {

    const [classification, setclassification] = useState("");
    const [description, setdescription] = useState("");
    const [accountNumber, setaccountNumber] = useState("");
    const [agencyNumber, setagencyNumber] = useState("");
    const [inicialBalanceDate, setinicialBalanceDate] = useState("");
    const [inicialBalance, setinicialBalance] = useState("");
    const [bank, setbank] = useState("");
    const [cnpjCompany, setCnpjCompany] = useState("");
    
    const [companies, setCompanies] = useState([]);

    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api(id == undefined ? '/bank-account/new' : '/bank-account');
    const api2 = new Api('/company');

    useEffect(() => {
        try {
            api2.listar()
                .then((res) => setCompanies(res.data))
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
        setdescription(res.data['description']);
        setaccountNumber(res.data['accountNumber']);
        setagencyNumber(res.data['agencyNumber']);
        setinicialBalance(res.data['inicialBalance']);
        setbank(res.data['bank']);
        setinicialBalanceDate(res.data['inicialBalanceDate']);
        setCnpjCompany(res.data['cnpjCompany']);

    }
    const setCompanySelected = (e) => {
        e.preventDefault();
        setCnpjCompany(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            const _bankAccount = {
                id: id,
                classification: classification,
                description: description,
                accountNumber: accountNumber,
                agencyNumber: agencyNumber,
                inicialBalanceDate: inicialBalanceDate,
                inicialBalance: inicialBalance,
                bank: bank,
                cnpjCompany: cnpjCompany
            };

            api.salvar(_bankAccount)
                .then(res => router.push('/bankaccount'))
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
                <Form.Label>Classifica????o da conta (credito/d??bito) </Form.Label>
                <Form.Control name="classification" placeholder="Classifica????o"
                    required defaultValue={classification}
                    onChange={(e) => setclassification(e.target.value)}
                />
                <Form.Label>Descri????o</Form.Label>
                <Form.Control name="description" placeholder="Descri????o"
                    required defaultValue={description}
                    onChange={(e) => setdescription(e.target.value)}
                />
                <Form.Label>N??mero da Conta</Form.Label>
                <Form.Control name="accountNumber" placeholder="N?? desta conta"
                    required defaultValue={accountNumber}
                    onChange={(e) => setaccountNumber(e.target.value)}
                />

                <Form.Label>Ag??ncia</Form.Label>
                <Form.Control name="agencyNumber" placeholder="N?? da ag??ncia"
                    required defaultValue={agencyNumber}
                    onChange={(e) => setagencyNumber(e.target.value)}
                />
                <Form.Label>Data de Cria????o da Conta</Form.Label>
                <Form.Control name="inicialBalanceDate" placeholder="Abertura"
                    required defaultValue={inicialBalanceDate}
                    onChange={(e) => setinicialBalanceDate(e.target.value)}
                />

                <Form.Label>Saldo</Form.Label>
                <Form.Control name="inicialBalance" placeholder="Valor em conta"
                    required defaultValue={inicialBalance}
                    onChange={(e) => setinicialBalance(e.target.value)}
                />

                <Form.Label>C??digo do banco</Form.Label>
                <Form.Control name="bank" placeholder="C??digo do banco"
                    required defaultValue={bank}
                    onChange={(e) => setbank(e.target.value)}
                />

                <Form.Label>CNPJ da empresa</Form.Label>
                <br/>
                <Form.Select defaultValue={"Selecione"} size="lg" onChange={(e) => setCompanySelected(e)}>

                    <option value="Selecione">Selecione</option>
                    {companies.map((comp) => (
                        <option selected={comp.cnpj == cnpjCompany }
                            key={comp.id} 
                        value={comp.cnpj}> {comp.corporateName} - {comp.cnpj}
                        
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


FormBankAccount.defaultProps = {
    id: undefined
};




