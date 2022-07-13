import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Api } from '../../services/api';

export default function FormProvider({id}) {
   
    const [nome, setCorporateName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [address, setAddress] = useState("");
    const [county, setCounty] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");

    const [erro, setErro] = useState(false);

    const router = useRouter();
    const api = new Api( id == undefined ? '/provider/new' : '/provider'  );

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
        setCorporateName(res.data['corporateName']);
        setCnpj(res.data['cnpj']);
        setAddress(res.data['address']);
        setCounty(res.data['county']);
        setZipCode(res.data['zipCode']);
        setPhone(res.data['phone']);
        setMail(res.data['mail']);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const _provider = {
                id: id,
                corporateName: nome,
                cnpj: cnpj,
                address: address,
                county: county,
                zipCode: zipCode,
                phone: phone,
                mail: mail,
            };
            api.salvar(_provider)
                .then(res => router.push('/'))
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
            setErro("Erro ao salvar Fornecedor!");
        }
    };

    return <Container>
        {erro}
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control name="nome" placeholder="Nome (Fornecedor)"
                    required defaultValue={nome}
                    onChange={(e) => setCorporateName(e.target.value)}
                />

                <Form.Label>CNPJ/CPF</Form.Label>
                <Form.Control name="cnpj" placeholder="CNPJ/CPF"
                    required defaultValue={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                />
                <Form.Label>Endereço</Form.Label>
                <Form.Control name="address" placeholder="Endereço da empresa"
                    required defaultValue={address}
                    onChange={(e) => setAddress(e.target.value)}
                />



                <Form.Label>Cidade</Form.Label>
                <Form.Control name="county" placeholder="Cidade"
                    required defaultValue={county}
                    onChange={(e) => setCounty(e.target.value)}
                />
                <Form.Label>CEP</Form.Label>
                <Form.Control name="zipCode" placeholder="CEP do endereço"
                    required defaultValue={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                />
                <Form.Label>Telefone</Form.Label>
                <Form.Control name="phone" placeholder="(00) 0 0000-0000"
                    required defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Form.Label>E-mail</Form.Label>
                <Form.Control name="mail" placeholder="e-mail@email.com"
                    required defaultValue={mail}
                    onChange={(e) => setMail(e.target.value)}
                />
           


            </Form.Group>

            <Row className="justify-content-end mt-3">
                <Col md="auto">
                    <Button variant="outline-secondary" type="button" onClick={() => router.push('/disciplinas')}>
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


FormProvider.defaultProps = {
    id: undefined
};


