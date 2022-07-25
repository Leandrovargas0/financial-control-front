import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import Employees from '../../components/Employee/listagem';

export default function emplpoyeeIndex() {
    return <Layout title="Colaboradores Cadastrados">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/employee/add">Novo Vínculo</Button>
        </Row>
        <Employees mostrar={true}></Employees>
    </Layout>;
}