import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import FormBankAccount from '../../components/Bankaccount/formbankaccount';

export default function AddBankAcoount() {
    return <Layout title="Dados da Conta Bancária">
        <FormBankAccount></FormBankAccount>
    </Layout>;
}