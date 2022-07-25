import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import Sectors from '../../components/Sector/listagem';



export default function sectorIndex() {
    return <Layout title="Setores">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/sector/add">Novo Setor</Button>
        </Row>
        <Sectors mostrar={true}></Sectors>
    </Layout>;
}