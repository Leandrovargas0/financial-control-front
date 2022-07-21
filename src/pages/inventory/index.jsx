import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import Inventorys from '../../components/Inventory/listagem';

export default function InventoryIndex() {
    return <Layout title="Estoque de Produtos">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/inventory/add">Adicionar ao estoque</Button>
        </Row>
        <Inventorys mostrar={true}></Inventorys>
    </Layout>;
}