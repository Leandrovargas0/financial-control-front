import Layout from "../../components/Layout/layout";
import FormProvider from '../../components/Provider/formprovider';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditProvider() {

    const router = useRouter();

    const [id, setProviderId] = useState(0);

    const getAndSetIdProvider = () => {
        setProviderId(router.query["id"]);
    };

    useEffect(() => getAndSetIdProvider());

    return <Layout title={"Editar Fornecedor"}>
        <FormProvider id={id}></FormProvider>
    </Layout>
}

