import Layout from "../../components/Layout/layout";
import FormPatrimony from '../../components/Bankdeposit/formpatrimony';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditEntryPay() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Deposito/retirada"}>
        <FormPatrimony id={id}></FormPatrimony>
    </Layout>
}

