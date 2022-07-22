import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import Patimonies from '../../components/Patrimony/listagem';



export default function bankAccountIndex() {
    return <Layout title="Patrimônio">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/patrimony/add">Novo patrimônio</Button>
        </Row>
        <Patimonies mostrar={true}></Patimonies>
    </Layout>;
}