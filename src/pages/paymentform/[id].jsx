import Layout from "../../components/Layout/layout";
import FormPaymentForm from '../../components/Paymentform/formpaymentform';
import { useRouter } from "next/router";

import React, { useState, useEffect } from 'react';

export default function EditPaymentForm() {

    const router = useRouter();

    const [id, setCompanyId] = useState(0);

    const getAndSetIdCompany = () => {
        setCompanyId(router.query["id"]);
    };

    useEffect(() => getAndSetIdCompany());

    return <Layout title={"Editar Forma de Pagamento"}>
        <FormPaymentForm id={id}></FormPaymentForm>
    </Layout>
}

