import Layout from "../../components/Layout/layout";
import FormSector from '../../components/Sector/formsector';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditPayroll() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Setor"}>
        <FormSector id={id}></FormSector>
    </Layout>
}

