import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormBankAccountEmployee({ id }) {

    const [bank, setBank] = useState("");
    const [employee, setEmployee] = useState("");
    const [conta, setConta] = useState("");
    const [agencia, setAgencia] = useState("");
    const [dvAgencia, setDvAgencia] = useState("");
    const [dvConta, setdvConta] = useState("");

    const [banks, setBanks] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api(id == undefined ? '/bankaccountemployee/new' : '/bankaccountemployee');
    const api2 = new Api('/bank');
    const api3 = new Api('/employee');
    

    useEffect(() => {
        try {
            api2.listar()
                .then((res) => setBanks(res.data))
                .catch(err => setErro("Erro ao recuperar entidade!"));
        }
        catch (erro) {
        }

        try {
            api3.listar()
                .then((res) => setEmployees(res.data))
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
        setBank(res.data['bank']['id']);
        setEmployee(res.data['employee']['id']);
        setConta(res.data['conta']);
        setAgencia(res.data['agencia']);
        setDvAgencia(res.data['dvAgencia']);
        setdvConta(res.data['dvConta']);
    }


    // const [bank, setBank] = useState("");
    // const [employee, setEmployee] = useState("");
    // const [conta, setConta] = useState("");
    // const [agencia, setAgencia] = useState("");
    // const [dvAgencia, setDvAgencia] = useState("");
    // const [dvConta, setdvConta] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            const _bankAccountEmployee = {
                id: id,
                bank: {
                    id: bank
                },
                employee: {
                    id: employee
                },
                conta: conta,

                agencia: agencia,
                dvAgencia: dvAgencia,
                dvConta:  dvConta

            };
           
            api.salvar(_bankAccountEmployee)
                .then(res => router.push('/bankaccountemployee'))
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
                <Form.Label>Banco</Form.Label>
                <br/>
                <Form.Select defaultValue={"0"} size="lg" onChange={(e) => setBank(e.target.value)}>
                    <option value="0">Selecione</option>
                    {banks.map((comp) => (
                    <option key={comp.id} value={comp.id} selected={comp.id == bank}>
                    {comp.nameBank} - CNPJ:{comp.bankName} {comp.cnpj}
                    </option>
                ))}
                <br/>
                </Form.Select>
                <br/>
                <Form.Label>Funcionário</Form.Label>
                <br/>
                
                <Form.Select defaultValue={"0"} size="lg" onChange={(e) => setEmployee(e.target.value)}>
                    <option value="0">Selecione</option>
                    {employees.map((comp) => (
                    <option key={comp.id} value={comp.id} selected={comp.id == employee}>
                    {comp.people.name} - CPF:{comp.people.cpf}
                    </option>
                ))}
                </Form.Select>
                <br/><br/>
                <Form.Label>Agência</Form.Label>
                <Form.Control name="Agencia" placeholder="Agência" 
                    required defaultValue={agencia}
                    onChange={(e) => setAgencia(e.target.value)}
                />
                <br/>
                <Form.Label>Dígito Verificador Agência</Form.Label>
                <Form.Control name="DV Agencia" placeholder="DV Agência" type='number'
                    defaultValue={dvAgencia}
                    onChange={(e) => setDvAgencia(e.target.value)}
                />
                <br/>
                <Form.Label>Número da Conta</Form.Label>
                <Form.Control name="Número da Conta" placeholder="Número da Conta" type='number'
                    required defaultValue={conta}
                    onChange={(e) => setConta(e.target.value)}/>
                <br/>
                <Form.Label>Dígito Verificador Conta</Form.Label>
                <Form.Control name="Número da Conta" placeholder="DV Conta" type='number'
                    required defaultValue={dvConta}
                    onChange={(e) => setdvConta(e.target.value)}/>

            </Form.Group>

            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/bankaccountemployee')}>
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


FormBankAccountEmployee.defaultProps = {
    id: undefined
};




