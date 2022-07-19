import Layout from "../../components/Layout/layout";
import FormEntrypay from '../../components/Entrypay/formentrypay';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditEntryPay() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Conta a Receber"}>
        <FormEntrypay id={id}></FormEntrypay>
    </Layout>
}

