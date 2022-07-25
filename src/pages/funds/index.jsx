import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import Funds from '../../components/Funds/listagem';



export default function fundsIndex() {
    return <Layout title="Verbas">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/funds/add">Nova Verba</Button>
        </Row>
        <Funds mostrar={true}></Funds>
    </Layout>;
}