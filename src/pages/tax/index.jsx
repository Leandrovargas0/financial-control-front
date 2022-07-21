import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import Taxes from '../../components/Tax/listagem';



export default function taxIndex() {
    return <Layout title="Impostos">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/tax/add">Novo Imposto</Button>
        </Row>
        <Taxes mostrar={true}></Taxes>
    </Layout>;
}