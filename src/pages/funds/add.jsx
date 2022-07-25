import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import FormFunds from '../../components/Funds/formfunds';

export default function AddFunds() {
    return <Layout title="Dados da Verba">
        <FormFunds></FormFunds>
    </Layout>;
}