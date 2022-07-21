import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import BillsToPays from '../../components/Billstopay/listagem';

export default function billsIndex() {
    return <Layout title="Contas a Pagar">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/billstopay/add">Nova conta a Pagar</Button>
        </Row>
        <BillsToPays mostrar={true}></BillsToPays>
    </Layout>;
}