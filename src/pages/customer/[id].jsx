import Layout from "../../components/Layout/layout";
import FormCustomer from '../../components/Customer/formcustomer';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditCustomer() {

    const router = useRouter();

    const [id, setProviderId] = useState(0);

    const getAndSetIdProvider = () => {
        setProviderId(router.query["id"]);
    };

    useEffect(() => getAndSetIdProvider());

    return <Layout title={"Editar Cliente"}>
        <FormCustomer id={id}></FormCustomer>
    </Layout>
}

