import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import FormCompany from '../../components/Company/formcompany';

export default function AddCompany() {
    return <Layout title="Dados da Empresa">
        <FormCompany></FormCompany>
    </Layout>;
}