import Layout from "../../components/Layout/layout";
import FormTax from '../../components/Tax/formtax';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditTax() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Imposto"}>
        <FormTax id={id}></FormTax>
    </Layout>
}

