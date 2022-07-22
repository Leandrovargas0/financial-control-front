import Layout from "../../components/Layout/layout";
import FormPatrimony from '../../components/Patrimony/formpatrimony';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditEntryPay() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar item do patrimônio"}>
        <FormPatrimony id={id}></FormPatrimony>
    </Layout>
}

