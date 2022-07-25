import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';
import React from "react";


export default function FormPayroll({ id }) {



    const [fund, setFund] = useState("");
    const [employee, setEmployee] = useState("");
    const [valorBruto, setValorBruto] = useState("");
    const [valorDesconto, setValorDesconto] = useState("");
    const [valorLiquido, setValorLiquido] = useState("");
    const [dataPagamento, setDataPagamento] = useState("");

    const [employees, setEmployees] = useState([]);
    const [funds, setFunds] = useState([]);

    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api(id == undefined ? '/payroll/new' : '/payroll');
    const api3 = new Api('/employee');
    

    useEffect(() => {
   
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
            alert(erro);
        }
    }, [id]);

    
   
    
    const setCamposJson = (res) => {
        setEmployee(res.data['employee']['id']);
        setValorBruto(res.data['valorBruto']);
        setValorDesconto(res.data['valorDesconto']);
        setValorLiquido(res.data['valorLiquido']);
        setDataPagamento(res.data['dataPagamento']);
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            const _bankAccountEmployee = {
                id: id,
                employee: {
                    id: employee
                },
                valorBruto: valorBruto,
                valorDesconto: valorDesconto,
                dataPagamento: dataPagamento

            };
            api.salvar(_bankAccountEmployee)
                .then(res => router.push('/payroll'))
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
            setErro("Erro ao salvar Dados de Folha!");
        }
    };

    return <Container>
        {erro}
        <Form onSubmit={handleSubmit}>
                
            <Form.Group controlId="nome">
           
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
                <Form.Label>Valor Bruto</Form.Label>
                <Form.Control name="Bruto" placeholder="Valor Bruto"  type='number' min step="0.01"
                    required defaultValue={valorBruto}
                    onChange={(e) => setValorBruto(e.target.value)}
                />
                <br/>
                <Form.Label>Valor Descontos</Form.Label>
                <Form.Control name="Descontos" placeholder="Digite o valor a ser descontado" type='number' min step="0.01"
                    defaultValue={valorDesconto}
                    onChange={(e) => setValorDesconto(e.target.value)}
                />
                <br/>
                <Form.Label>Data Pagamento</Form.Label>
                <Form.Control name="Data do Pagamento" placeholder="Data pagamento" type='date'
                    required defaultValue={dataPagamento}
                    onChange={(e) => setDataPagamento(e.target.value)}/>

            </Form.Group>

            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/payroll')}>
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


FormPayroll.defaultProps = {
    id: undefined
};




