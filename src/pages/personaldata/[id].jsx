import Layout from "../../components/Layout/layout";
import FormPersonalData from '../../components/Personaldata/formpersonaldata';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function Editpessoa() {

    const router = useRouter();

    const [id, setId] = useState(0);

    const getAndSetId = () => {
        setId(router.query["id"]);
    };

    useEffect(() => getAndSetId());

    return <Layout title={"Editar a Pessoa"}>

        <FormPersonalData id={id}></FormPersonalData>
    </Layout>
}

