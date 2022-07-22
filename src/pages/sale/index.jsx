import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import Sales from '../../components/Sale/listagem';

export default function saleIndex() {
    return <Layout title="Histórico de Vendas">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/sale/add">Nova Venda</Button>
        </Row>
        <Sales mostrar={true}></Sales>
    </Layout>;
}