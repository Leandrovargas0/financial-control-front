import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import AccountCharts from '../../components/Accountchart/listagem';



export default function accountChartIndex() {
    return <Layout title="Planos de Contas">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/accountchart/add">Novo Plano de Contas</Button>
        </Row>
        <AccountCharts mostrar={true}></AccountCharts>
    </Layout>;
}