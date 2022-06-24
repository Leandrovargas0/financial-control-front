import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout/layout';


export default function homeindex() {
    return <Layout title="Home">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/home/add">+ Adicionar</Button>
        </Row>
    </Layout>;
}