import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormEmployee({ id }) {


    const [company, setcompany] = useState("");
    const [people, setpeople] = useState("");
    const [profession, setprofession] = useState("");
    const [funds, setfunds] = useState("");
    const [healthPlan, sethealthPlan] = useState("");


    const [companies, setCompanies] = useState([]);
    const [peoples, setpeoples] = useState([]);
    const [professions, setprofessions] = useState([]);
    const [fundss, setfundss] = useState([]);
    const [healthPlans, sethealthPlans] = useState([]);




    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api(id == undefined ? '/employee/new' : '/employee');
    const api2 = new Api('/company');
    const api3 = new Api('/personaldata');
    const api4 = new Api('/professions');
    const api5 = new Api('/funds');
    const api6 = new Api('/healthplan');

    useEffect(() => {
        try {
            api2.listar()
                .then((res) => setCompanies(res.data))
                .catch(err => setErro("Erro ao recuperar entidade!"));
        }
        catch (erro) { }

        try {
            api3.listar()
                .then((res) => setpeoples(res.data))
                .catch(err => setErro("Erro ao recuperar entidade!"));
        }
        catch (erro) { }


        try {
            api4.listar()
                .then((res) => setprofessions(res.data))
                .catch(err => setErro("Erro ao recuperar entidade!"));
        }
        catch (erro) { }

        try {
            api5.listar()
                .then((res) => setfundss(res.data))
                .catch(err => setErro("Erro ao recuperar entidade!"));
        }
        catch (erro) { }


        try {
            api6.listar()
                .then((res) => sethealthPlans(res.data))
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
        setcompany(res.data['company']['id']);
        setpeople(res.data['people']['id']);
        setprofession(res.data['profession']['id']);
        setfunds(res.data['funds']['id']);
        sethealthPlan(res.data['healthPlan']['id']);
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const _entrypay = {
                id: id,                
                company: {
                    id: company
                },
                people: {
                    id: people
                },
                funds: {
                    id: funds
                },
                healthPlan: {
                    id: healthPlan
                },
                profession: {
                    id: profession
                },

            };

            api.salvar(_entrypay)
                .then(res => router.push('/employee'))
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

                <br />
                <Form.Label>Empresa</Form.Label>
                <br />
                <Form.Select defaultValue={"0"} size="lg" onChange={(e) => setcompany(e.target.value)}>

                    <option value="0">Selecione</option>
                    {companies.map((comp) => (
                        <option key={comp.id} value={comp.id} selected={comp.id == company}>
                            {comp.corporateName} - CNPJ:{comp.corporateName} - {comp.cnpj}
                        </option>
                    ))}
                </Form.Select>

                <br /> <br />


                <Form.Label>Pessoa</Form.Label>
                <br />
                <Form.Select defaultValue={"0"} size="lg" onChange={(e) => setpeople(e.target.value)}>

                    <option value="0">Selecione</option>
                    {peoples.map((comp) => (
                        <option key={comp.id} value={comp.id} selected={comp.id == people}>
                            {comp.name} - CPF:{comp.name} - Nascimento {comp.birthDate}
                        </option>
                    ))}
                </Form.Select>

                <br /> <br />

                <Form.Label>Cargo</Form.Label>
                <br />
                <Form.Select defaultValue={"0"} size="lg" onChange={(e) => setprofession(e.target.value)}>

                    <option value="0">Selecione</option>
                    {professions.map((comp) => (
                        <option key={comp.id} value={comp.id} selected={comp.id == profession}>
                            {comp.professionName} - Carga horária:{comp.workload}
                        </option>
                    ))}
                </Form.Select>

                <br /> <br />

                <Form.Label>Verba Principal</Form.Label>
                <br />
                <Form.Select defaultValue={"0"} size="lg" onChange={(e) => setfunds(e.target.value)}>

                    <option value="0">Selecione</option>
                    {fundss.map((comp) => (
                        <option key={comp.id} value={comp.id} selected={comp.id == funds}>
                            {comp.name}
                        </option>
                    ))}
                </Form.Select>

                <br /> <br />


                <Form.Label>Plano de Saúde</Form.Label>
                <br />
                <Form.Select defaultValue={"0"} size="lg" onChange={(e) => sethealthPlan(e.target.value)}>

                    <option value="0">Selecione</option>
                    {healthPlans.map((comp) => (
                        <option key={comp.id} value={comp.id} selected={comp.id == healthPlan}>
                            {comp.operadora} - Cod ANS {comp.codigoAns}
                        </option>
                    ))}
                </Form.Select>

                <br /> <br />





            </Form.Group>
            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/employee')}>
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


FormEmployee.defaultProps = {
    id: undefined
};




