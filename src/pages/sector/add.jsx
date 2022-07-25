import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import FormSector from '../../components/Sector/formsector';

export default function AddPayroll() {
    return <Layout title="Lançamento de Informações de Pagamento">
        <FormSector></FormSector>
    </Layout>;
}