import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import FormProfessions from '../../components/Professions/formprofessions';

export default function AddFunds() {
    return <Layout title="Dados do Cargo">
        <FormProfessions></FormProfessions>
    </Layout>;
}