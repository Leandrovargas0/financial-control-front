import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import FormAccountChart from '../../components/Accountchart/formaccountchart';

export default function AddAccountChart() {
    return <Layout title="Dados da Conta Bancária">
        <FormAccountChart></FormAccountChart>
    </Layout>;
}