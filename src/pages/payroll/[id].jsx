import Layout from "../../components/Layout/layout";
import FormPayroll from '../../components/Payroll/formpayroll';
import ItempayTable from '../../components/Payroll/itempay';
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';



export default function EditPayroll() {

    const { query } = useRouter();
    const id = query.id;
    const [items, setItems] = useState("");

    useEffect(() => {
        setItems(localStorage.getItem('payroll_id'));
        console.log(items);
    }, [items]);

    return <Layout title={"Editar Informações de Folha do Colaborador"}>
        <FormPayroll id={items} ></FormPayroll>
        <ItempayTable payroll_id={items}></ItempayTable>
    </Layout>;
}

