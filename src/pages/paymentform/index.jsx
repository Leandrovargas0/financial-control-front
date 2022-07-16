import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import AccountCharts from '../../components/Paymentform/listagem';



export default function paymentFormIndex() {
    return <Layout title="Formas de Pagamento">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/paymentform/add">Nova Forma de Pagamento</Button>
        </Row>
        <AccountCharts mostrar={true}></AccountCharts>
    </Layout>;
}