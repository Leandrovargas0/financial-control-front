import Layout from "../../components/Layout/layout";
import FormInventory from '../../components/Inventory/forminventory';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditInventory() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Manipule o Estoque deste produto"}>
        <FormInventory id={id}></FormInventory>
    </Layout>
}

