import Layout from "../../components/Layout/layout";
import FormAccountChart from '../../components/Accountchart/formaccountchart';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditAccountChart() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Conta Bancária"}>
        <FormAccountChart id={id}></FormAccountChart>
    </Layout>
}

