import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import Professions from '../../components/Professions/listagem';



export default function professionsIndex() {
    return <Layout title="Cargos">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/bank/add">Novo Banco</Button>
        </Row>
        <Professions mostrar={true}></Professions>
    </Layout>;
}