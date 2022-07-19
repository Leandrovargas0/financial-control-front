import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import Entrypays from '../../components/Entrypay/listagem';



export default function bankAccountIndex() {
    return <Layout title="Contas a receber">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/entrypay/add">Nova conta a receber</Button>
        </Row>
        <Entrypays mostrar={true}></Entrypays>
    </Layout>;
}