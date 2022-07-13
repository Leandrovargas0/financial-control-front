import Layout from "../../components/Layout/layout";
import FormBankAccount from '../../components/Bankaccount/formbankaccount';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function Editsompany() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Conta Bancária"}>
        <FormBankAccount id={id}></FormBankAccount>
    </Layout>
}

