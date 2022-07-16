import { Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import Customers from '../../components/Customer/listagem';



export default function customerindex() {
    return <Layout title="Clientes Cadastrados">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/customer/add">Novo Cliente</Button>
        </Row>
        <Customers mostrar={true}></Customers>
    </Layout>;
}