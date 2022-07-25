import Layout from "../../components/Layout/layout";
import FormBankAccount from '../../components/Bankaccountemployee/formbankaccountemployee';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditbankAc() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Conta Bancária Funcionários"}>
        <FormBankAccount id={id}></FormBankAccount>
    </Layout>
}

