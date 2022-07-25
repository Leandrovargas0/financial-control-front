import Layout from "../../components/Layout/layout";
import FormBank from '../../components/Bank/formbank';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditBank() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Banco"}>
        <FormBank id={id}></FormBank>
    </Layout>
}

