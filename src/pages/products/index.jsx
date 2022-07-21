import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import Products from '../../components/Products/listagem';

export default function productsIndex() {
    return <Layout title="Produtos Cadastrados">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/products/add">Novo Produto</Button>
        </Row>
        <Products mostrar={true}></Products>
    </Layout>;
}