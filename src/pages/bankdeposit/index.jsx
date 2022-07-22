import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import Patimonies from '../../components/Bankdeposit/listagem';



export default function bankAccountIndex() {
    return <Layout title="Depositos/retiradas">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/bankdeposit/add">Novo deposito ou retirada</Button>
        </Row>
        <Patimonies mostrar={true}></Patimonies>
    </Layout>;
}