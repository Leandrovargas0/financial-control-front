import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import Payroll from '../../components/Payroll/listagem';



export default function bankAccountIndex() {
    return <Layout title="Folha de Pagamento">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/payroll/add">Novo Setor</Button>
        </Row>
        <Payroll mostrar={true}></Payroll>
    </Layout>;
}