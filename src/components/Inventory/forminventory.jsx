import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormInventory({ id }) {

    const [estimatedSalePrice, setestimatedSalePrice] = useState("");
    const [qtde, setqtde] = useState("");
    const [products, setproducts] = useState("");

    const [Prods, setProds] = useState([]);

    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api(id == undefined ? '/inventory/new' : '/inventory');
    const api2 = new Api('/products');


    useEffect(() => {
        try {
            api2.listar()
                .then((res) => setProds(res.data))
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
        setestimatedSalePrice(res.data['estimatedSalePrice']);
        setqtde(res.data['qtde']);
        setproducts(res.data['products']['id']);
    }

    const setProvidersSelected = (e) => {
        e.preventDefault();
        setprovider(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const _entrypay = {
                id: id,
                estimatedSalePrice: estimatedSalePrice.replace(",", "."),
                qtde: qtde,
                products: {
                    id: products
                },
            };

            api.salvar(_entrypay)
                .then(res => router.push('/inventory'))
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
            <Form.Group controlId="estimatedSalePrice">
                <Form.Label>Preço Unitário de Venda</Form.Label>
                <Form.Control name="estimatedSalePrice" placeholder="Valor (R$)"
                    required defaultValue={estimatedSalePrice}
                    onChange={(e) => setestimatedSalePrice(e.target.value)}
                />
                <Form.Label>Quantidade</Form.Label>
                <Form.Control name="qtde" placeholder="Quantidade"
                    required defaultValue={qtde}
                    onChange={(e) => setqtde(e.target.value)}
                />

                <br />
                <Form.Label>Produto</Form.Label>
                <br />
                <Form.Select defaultValue={"Selecione"} size="lg" onChange={(e) => setProvidersSelected(e)}>

                    <option value="Selecione">Selecione</option>
                    {Prods.map((comp) => (
                        <option selected={comp.id == products}
                            key={comp.id}
                            value={comp.id}> {comp.nameProduct} - Fornecedor: {comp.provider.corporateName} {comp.provider.cnpjCpf}

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


FormInventory.defaultProps = {
    id: undefined
};




