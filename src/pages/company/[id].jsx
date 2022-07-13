import Layout from "../../components/Layout/layout";
import FormCompany from '../../components/Company/formcompany';
import { useRouter } from "next/router";

import { Row, Button } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';

export default function Editsompany() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Compania"}>

        <Row className="float-right row pb-2 pr-5">
            <Button variant="info" href="/bankaccount/add" id={id}>Nova Conta Bancária</Button>
        </Row>

        <Row className="float-right row pb-2 pr-5">
            <Button variant="success" href="/bankaccount" id={id}>Contas Bancárias Cadastradas</Button>
        </Row>

        <FormCompany id={id}></FormCompany>
    </Layout>
}

