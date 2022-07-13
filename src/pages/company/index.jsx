import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import Companies from '../../components/Company/listagem';

export default function companyindex() {
    return <Layout title="Empresa Cadastradas">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/company/add">Nova Empresa</Button>
        </Row>
        <Companies mostrar={true}></Companies>
    </Layout>;
}