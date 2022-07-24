import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import Banks from '../../components/Bank/listagem';



export default function bankAccountIndex() {
    return <Layout title="Bancos">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/bank/add">Novo Banco</Button>
        </Row>
        <Banks mostrar={true}></Banks>
    </Layout>;
}