import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import Personaldatas from '../../components/Personaldata/listagem';

export default function personalindex() {
    return <Layout title="Lista de Pessoas">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/personaldata/add">Nova Pessoa</Button>
        </Row>
        <Personaldatas mostrar={true}></Personaldatas>
    </Layout>;
}