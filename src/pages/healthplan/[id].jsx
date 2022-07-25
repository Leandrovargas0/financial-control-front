import Layout from "../../components/Layout/layout";
import FormHealthPlan from '../../components/Healthplan/formhealthplan';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function Edit() {

    const router = useRouter();

    const [id, setId] = useState(0);

    const getAndSetId = () => {
        setId(router.query["id"]);
    };

    useEffect(() => getAndSetId());

    return <Layout title={"Editar Plano de Saude"}>
        <FormHealthPlan id={id}></FormHealthPlan>
    </Layout>
}

