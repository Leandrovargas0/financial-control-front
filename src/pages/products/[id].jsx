import Layout from "../../components/Layout/layout";
import FormProducts from '../../components/Products/formproducts';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditProducts() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Conta a Pagar"}>
        <FormProducts id={id}></FormProducts>
    </Layout>
}

