import Layout from "../../components/Layout/layout";
import FormSale from '../../components/Sale/formsale';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditProducts() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Venda"}>
        <FormSale id={id}></FormSale>
    </Layout>
}

