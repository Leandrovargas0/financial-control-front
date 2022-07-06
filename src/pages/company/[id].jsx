import Layout from "../../components/Layout/layout";
import FormCompany from '../../components/Company/formcompany';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function Editsompany() {

    const router = useRouter();
    //const id={id} = router.query;

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Compania"}>
        <FormCompany id={id}></FormCompany>
    </Layout>
}

