import Layout from "../../components/Layout/layout";
import FormBillsToPay from '../../components/Billstopay/formbillstopay';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditBillsToPay() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Conta a Pagar"}>
        <FormBillsToPay id={id}></FormBillsToPay>
    </Layout>
}

