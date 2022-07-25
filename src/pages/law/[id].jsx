import Layout from "../../components/Layout/layout";
import FormLaw from '../../components/Law/formlaw';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditLaw() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Lei"}>
        <FormLaw id={id}></FormLaw>
    </Layout>
}

