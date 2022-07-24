import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import FormEmployee from '../../components/Employee/formemployee';

export default function Add() {
    return <Layout title="Dados do Colaborador">
        <FormEmployee></FormEmployee>
    </Layout>;
}