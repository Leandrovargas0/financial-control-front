import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormTax({ id }) {
    //Taxes formtax FormTax
    const [percent, setpercent] = useState("");
    const [nameTax, setnameTax] = useState("");
    const [scope, setscope] = useState("");
    const [law, setlaw] = useState("");

    const [laws, setlaws] = useState([]);
    const [erro, setErro] = useState(false);
    const router = useRouter();

    const api = new Api(id == undefined ? '/tax/new' : '/tax');
    const api2 = new Api('/law');
    useEffect(() => {

        try {
            api2.listar()
                .then((res) => setlaws(res.data))
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
        setpercent((res.data['percent']).toString().replace(",", "."));
        setnameTax(res.data['nameTax']);
        setscope(res.data['scope']);
        setlaw(res.data['law']['id']);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const compania = {
                id: id,
                percent: percent.replace(",", "."),
                nameTax: nameTax,
                scope: scope,
                law: {
                    id: law
                }
            };
            api.salvar(compania)
                .then(res => router.push('/tax'))
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
            <Form.Group controlId="nameTax">
                <Form.Label>Imposto (Nome)</Form.Label>
                <Form.Control name="nameTax" placeholder="Ex: IRRF, IPVA, ICMS"
                    required defaultValue={nameTax}
                    onChange={(e) => setnameTax(e.target.value)}
                />
                <Form.Label>Esfera (Municipal, Estadual, Federal)</Form.Label>
                <Form.Control name="scope" placeholder="Esfera"
                    required defaultValue={scope}
                    onChange={(e) => setscope(e.target.value)}
                />

                <Form.Label>Percentual</Form.Label>
                <Form.Control name="percent" placeholder="Percentual do Imposto"
                    required defaultValue={percent}
                    onChange={(e) => setpercent(e.target.value)}
                />



                <br /> <br />

                <Form.Label>Lei</Form.Label>
                <br />
                <Form.Select defaultValue={"0"} size="lg" onChange={(e) => setlaw(e.target.value)}>

                    <option value="0">Selecione</option>
                    {laws.map((comp) => (
                        <option key={comp.id} value={comp.id} selected={comp.id == law}>
                            {comp.lawNumber}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/tax')}>
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

FormTax.defaultProps = {
    id: undefined
};


