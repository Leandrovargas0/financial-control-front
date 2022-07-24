import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormPersonalData({ id }) {

    const [name, setname] = useState("");
    const [cpf, setcpf] = useState("");
    const [birthDate, setbirthDate] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [rua, setrua] = useState("");
    const [bairro, setbairro] = useState("");
    const [cidade, setcidade] = useState("");


    const [erro, setErro] = useState(false);
    const router = useRouter();

    const api = new Api(id == undefined ? '/personaldata/new' : '/personaldata');

    useEffect(() => {
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
        setname(res.data['name']);
        setcpf(res.data['cpf']);
        setbirthDate(res.data['birthDate']);
        setemail(res.data['email']);
        setphone(res.data['phone']);
        setrua(res.data['rua']);
        setbairro(res.data['bairro']);
        setcidade(res.data['cidade']);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const compania = {
                id: id,
                name: name,
                cpf: cpf,
                birthDate: birthDate,
                email: email,
                phone: phone,
                rua: rua,
                bairro: bairro,
                cidade: cidade
            };
            api.salvar(compania)
                .then(res => router.push('/personaldata'))
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
            <Form.Group controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control name="name" placeholder="Nome"
                    required defaultValue={name}
                    onChange={(e) => setname(e.target.value)}
                />

                <Form.Label>CPF</Form.Label>
                <Form.Control name="cpf" placeholder="CPF"
                    required defaultValue={cpf}
                    onChange={(e) => setcpf(e.target.value)}
                />
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control name="birthDate" placeholder="AAAA-MM-DD"
                    required defaultValue={birthDate}
                    onChange={(e) => setbirthDate(e.target.value)}
                />

                <Form.Label>E-mail</Form.Label>
                <Form.Control name="email" placeholder="e-mail@email.com"
                    required defaultValue={email}
                    onChange={(e) => setemail(e.target.value)}
                />
                <Form.Label>FONE</Form.Label>
                <Form.Control name="phone" placeholder="(65) 9 9999-9999"
                    required defaultValue={phone}
                    onChange={(e) => setphone(e.target.value)}
                />

                <Form.Label>RUA</Form.Label>
                <Form.Control name="rua" placeholder="Rua"
                    required defaultValue={rua}
                    onChange={(e) => setrua(e.target.value)}
                />
                <Form.Label>Bairro</Form.Label>
                <Form.Control name="bairro" placeholder="Bairro"
                    required defaultValue={bairro}
                    onChange={(e) => setbairro(e.target.value)}
                />

                <Form.Label>Cidade</Form.Label>
                <Form.Control name="cidade" placeholder="Cidade"
                    required defaultValue={cidade}
                    onChange={(e) => setcidade(e.target.value)}
                />


            </Form.Group>

            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/personaldata')}>
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

FormPersonalData.defaultProps = {
    id: undefined
};


