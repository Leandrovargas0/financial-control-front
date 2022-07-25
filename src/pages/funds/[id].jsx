import Layout from "../../components/Layout/layout";
import FormFunds from '../../components/Funds/formfunds';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function Edit() {

    const router = useRouter();

    const [id, setId] = useState(0);

    const getAndSetId = () => {
        setId(router.query["id"]);
    };

    useEffect(() => getAndSetId());

    return <Layout title={"Editar Verba"}>
        <FormFunds id={id}></FormFunds>
    </Layout>
}

