import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormProducts({ id }) {

    const [value, setvalue] = useState("");
    const [nameProduct, setnameProduct] = useState("");
    const [description, setdescription] = useState("");
    const [company, setcompanyId] = useState("");
    const [provider, setprovider] = useState("");

    const [companies, setCompanies] = useState([]);
    const [providers, setproviders] = useState([]);

    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api(id == undefined ? '/products/new' : '/products');
    const api2 = new Api('/company');
    const api3 = new Api('/provider');

    useEffect(() => {
        try {
            api2.listar()
                .then((res) => setCompanies(res.data))
                .catch(err => setErro("Erro ao recuperar entidade!"));
        }
        catch (erro) { }

        try {
            api3.listar()
                .then((res) => setproviders(res.data))
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
        setvalue(res.data['value']);
        setnameProduct(res.data['nameProduct']);
        setdescription(res.data['description']);
        setprovider(res.data['provider']['id']);
        setcompanyId(res.data['company']['id']);
    }

    const setCompanySelected = (e) => {
        e.preventDefault();
        setcompanyId(e.target.value);
    }

    const setProvidersSelected = (e) => {
        e.preventDefault();
        setprovider(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setvalue(value.replace(",", "."));

        try {
            const _entrypay = {
                id: id,
                value: value,
                nameProduct: nameProduct,
                description: description,
                company: {
                    id: company
                },
                provider: {
                    id: provider
                },
            };

            api.salvar(_entrypay)
                .then(res => router.push('/products'))
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
            <Form.Group controlId="value">
                <Form.Label>Preço Unitário </Form.Label>
                <Form.Control name="value" placeholder="Valor (R$)"
                    required defaultValue={value}
                    onChange={(e) => setvalue(e.target.value)}
                />
                <Form.Label>Nome do Produto</Form.Label>
                <Form.Control name="nameProduct" placeholder="Nome"
                    required defaultValue={nameProduct}
                    onChange={(e) => setnameProduct(e.target.value)}
                />

                <Form.Label>Breve descrição</Form.Label>
                <Form.Control name="description" placeholder="Breve Descrição"
                    required defaultValue={description}
                    onChange={(e) => setdescription(e.target.value)}
                />


                <Form.Label>Revendedor</Form.Label>
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
                <Form.Label>Fornecedor</Form.Label>
                <br />
                <Form.Select defaultValue={"Selecione"} size="lg" onChange={(e) => setProvidersSelected(e)}>

                    <option value="Selecione">Selecione</option>
                    {providers.map((comp) => (
                        <option selected={comp.id == provider}
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


FormProducts.defaultProps = {
    id: undefined
};




