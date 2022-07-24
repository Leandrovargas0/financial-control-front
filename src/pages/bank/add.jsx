import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import FormBank from '../../components/Bank/formbank';

export default function AddBankAcoount() {
    return <Layout title="Dados do Banco">
        <FormBank></FormBank>
    </Layout>;
}