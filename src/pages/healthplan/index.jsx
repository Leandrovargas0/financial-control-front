import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import HealtPlan from '../../components/Healthplan/listagem';



export default function healthPlanIndex() {
    return <Layout title="Planos de Saúde">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/healthplan/add">Novo Plano de Saúde</Button>
        </Row>
        <HealtPlan mostrar={true}></HealtPlan>
    </Layout>;
}