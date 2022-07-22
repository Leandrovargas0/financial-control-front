import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container, Table } from 'react-bootstrap';

import { Api } from '../../services/api';

export default function FormSale({ id }) {
    const [value, setvalue] = useState("");
    const [emissionDate, setemissionDate] = useState("");
    const [customer, setcustomer] = useState("");
    const [tax, settax] = useState("");


    const [products, setproducts] = useState("");
    //banco
    const [mountobjproducts, setmountobjproducts] = useState([]);
    //tela
    const [objproducts, setobjproducts] = useState([]);

    //Usados para os selects
    const [customers, setcustomers] = useState([]);
    const [producties, setproducties] = useState([]);
    const [taxes, settaxes] = useState([]);

    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api(id == undefined ? '/sale/new' : '/sale');
    const api2 = new Api('/customer');
    const api3 = new Api('/products');
    const api4 = new Api('/tax');

    useEffect(() => {
        try {
            api2.listar()
                .then((res) => setcustomers(res.data))
                .catch(err => setErro("Erro ao recuperar entidade!"));
        }
        catch (erro) { }

        try {
            api3.listar()
                .then((res) => setproducties(res.data))
                .catch(err => setErro("Erro ao recuperar entidade!"));
        }
        catch (erro) { }

        try {
            api4.listar()
                .then((res) => settaxes(res.data))
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
        setemissionDate(res.data['emissionDate']);
        settax(res.data['tax']['id']);
        setcustomer(res.data['customer']['id']);
        setobjproducts(res.data['products']);
    }

    const mountTableProducts = (prod) => {
        //const prod = objproducts;
        return <Table striped bordered hover>
            <thead>
                <tr>
                    <td>Produto</td>
                    <td>Fornecedor</td>
                </tr>
            </thead>
            <tbody>
                {prod?.map((comp) => (
                    <tr key={comp.id}>
                        <td>{comp.nameProduct}</td>
                        <td>{comp.provider.corporateName}-{comp.provider.cnpjCpf}</td>
                    </tr>
                ))
                }
            </tbody>
        </Table>;
    }



    const AddProdutToList = (internalobjproducts) => {
        const addprod = [];
        const tamanho = internalobjproducts.length;
        var jainserido = false;

        if (parseInt(products) != 0) {
            if (mountobjproducts.length == 0) {
                if (tamanho > 0) {
                    for (var i = 0; i < tamanho; i++) {
                        if (internalobjproducts[i]["id"] == parseInt(products)) {
                            jainserido = true;
                        }

                        addprod.push(
                            { id: internalobjproducts[i]["id"] }
                        )
                    }
                }
            }
            else {
                for (var i = 0; i < mountobjproducts; i++) {
                    if (mountobjproducts[i]["id"] == parseInt(products)) {
                        jainserido = true;
                    }

                    addprod.push({ id: mountobjproducts[i]["id"] });
                }
            }

            if (jainserido) {
                alert("Este produto já foi adicionado a lista! Favor selecionar outro! \n ou salve para ver as alterações");
            }
            else {
                addprod.push({ id: parseInt(products) });
                setmountobjproducts(addprod);
                alert("Adicionado! Será Visível após Salvar a venda");
            }
        }
        else {
            alert("Selecione um produto para adicionar");
        }

    }



    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const _entrypay = {
                id: id,
                value: value.replace(",", "."),
                emissionDate: emissionDate,
                customer: {
                    id: customer
                },
                tax: {
                    id: tax
                },
                products: mountobjproducts,
            };

            api.salvar(_entrypay)
                .then(res => {
                    alert("Salvo");
                    router.push('/sale/'  + id)
                })
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
            <Form.Group controlId="value">
                <Form.Label>Preço Unitário </Form.Label>
                <Form.Control name="value" placeholder="Valor (R$)"
                    required defaultValue={value}
                    onChange={(e) => setvalue(e.target.value)}
                />
                <Form.Label>Data de Emissão</Form.Label>
                <Form.Control name="emissionDate" placeholder="AAAA-MM-DD"
                    required defaultValue={emissionDate}
                    onChange={(e) => setemissionDate(e.target.value)}
                />

                <br />
                <Form.Label>Cliente</Form.Label>
                <br />
                <Form.Select defaultValue={"Selecione"} size="lg"
                    onChange={(e) => setcustomer(e.target.value)}>
                    <option value="Selecione">Selecione</option>
                    {customers.map((comp) => (
                        <option selected={comp.id == customer}
                            key={comp.id}
                            value={comp.id}> {comp.corporateName} - {comp.cnpjCpf}
                        </option>
                    ))}
                </Form.Select>

                <br />
                <Form.Label>Imposto</Form.Label>
                <br />
                <Form.Select defaultValue={"0"} size="lg"
                    onChange={(e) => settax(e.target.value)}>
                    <option value="0">Selecione</option>
                    {taxes.map((comp) => (
                        <option selected={comp.id == tax}
                            key={comp.id}
                            value={comp.id}> {comp.nameTax} - {comp.scope} -  {comp.percent}%
                        </option>
                    ))}
                </Form.Select>

                <br />
                <Form.Label>Produtos</Form.Label>
                <br />
                <Form.Select defaultValue={"0"} size="lg" onChange={(e) => setproducts(e.target.value)}>

                    <option value="0">Selecione</option>
                    {producties.map((comp) => (
                        <option key={comp.id} value={comp.id}>
                            {comp.nameProduct} - Fornecedor:{comp.provider.corporateName} - {comp.provider.cnpjCpf}
                        </option>
                    ))}
                </Form.Select>

                <Button variant="success" type="button" onClick={() => { AddProdutToList(objproducts) }}>
                    Adicionar
                </Button>

                <br /><br />
                {mountTableProducts(objproducts)}

            </Form.Group>
            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/sale')}>
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


FormSale.defaultProps = {
    id: undefined
};




