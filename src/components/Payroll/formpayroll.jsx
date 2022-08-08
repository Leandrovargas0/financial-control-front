import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Table, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';
import React from "react";

import ItempayTable from './itempay';

export default function FormPayroll({ id }) {

    //const [isID, setisID] = useState(id);


    const [employee, setEmployee] = useState("");


    const [valor, setvalor] = useState("");
    const [funds, setfunds] = useState("");
    
    const [payroll, setpayroll] = useState("");
   // const [itemPay, setitemPay] = useState([]);

    const [employees, setEmployees] = useState([]);
    const [fundss, setfundss] = useState([]);

    const [mountobjproducts, setmountobjproducts] = useState([]);

    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api(id == undefined ? '/payroll/new' : '/payroll');

    const api2 = new Api('/funds');
    const api3 = new Api('/employee');
    const api4 = new Api('/itempay');
    const api5 = new Api('/itempay/new');

    useEffect(() => {


        try {
            if (id != undefined) {
                api.listar(id)
                    .then((res) => {
                        setEmployee(res.data['employee']['id']); 
                    })
                    .catch(err => setErro("Erro ao recuperar entidade!1"));

                    
            }
        } catch (erro) {
            setErro("Erro ao recuperar entidade!");
            alert(erro);
        }



        try {
            api2.listar()
                .then((res) => setfundss(res.data))
                .catch(err => setErro("Erro ao recuperar entidade!"));
        }
        catch (erro) {
        }

        try {
            if (id != undefined) {
                api3.listar(employee)
                .then((res) => setEmployees(res.data))
                .catch(err => setErro("Erro ao recuperar entidade!"));
            }else{
                api3.listar()
                .then((res) => setEmployees(res.data))
                .catch(err => setErro("Erro ao recuperar entidade!"));
            }   
        }
        catch (erro) {
        }

    }, [id]);





    const handleSubmitItem = () => {

        try {

            if (id == undefined && id == null) {
                const _payroll = {
                    id: id,
                    payMount: 12,
                    payYear: 2021,
                    employee: {
                        id: employee
                    }
                };
                api.salvar(_payroll)
                    .then(res => {
                        alert(res.data.id);
                        id = res.data.id;
                    }).catch();
            }

            const _itempay = {
                payroll: {
                    id: id
                },
                funds: {
                    id: funds
                },
                valor: valor
            };
            console.log(_itempay);
            api5.salvar(_itempay)
                .then(
                    res => router.push('/payroll/'+id)
                ).catch(err => { });
        } catch (error) {
            setErro("Erro ao salvar Dados de Folha!");
        }
    };

  

    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            const _payroll = {
                id: id,
                payMount: 12,
                payYear: 2021,
                employee: {
                    id: employee
                }
            };
            api.salvar(_payroll)
                .then().catch();
        } catch (error) {
            setErro("Erro ao salvar Dados de Folha!");
        }
    };

    return <Container>
        {erro}
        <Form onSubmit={handleSubmit}>

            <Form.Group controlId="nome">

                <Form.Label>Funcionário</Form.Label>
                <br />
                <Form.Select defaultValue={"0"} size="lg"  onChange={(e) => setEmployee(e.target.value)}>
                    <option value="0">Selecione</option>
                    {employees.map((comp) => (
                        <option key={comp.id} value={comp.id} selected={comp.id == employee}>
                            {comp.people.name} - CPF:{comp.people.cpf}
                        </option>
                    ))}
                </Form.Select>
                <br /><br />
                <Form.Label>Valor</Form.Label>
                <Form.Control name="Bruto" placeholder="Valor" type='number'
                    required defaultValue={valor}
                    onChange={(e) => setvalor(e.target.value)}
                />
                <br />

                <Form.Label>Selecione a Verba</Form.Label>
                <br />


                <Form.Select defaultValue={"0"} size="lg"  onChange={(e) => setfunds(e.target.value)}>
                    <option value="0">Selecione</option>
                    {fundss.map((comp) => (
                        <option key={comp.id} value={comp.id} >
                            {comp.name} 
                        </option>
                    ))}
                </Form.Select>

                <Button variant="success" type="button" onClick={() => { handleSubmitItem() }}>
                    Adicionar
                </Button>
                <br /><br />

              


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




