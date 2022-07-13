import { Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import Providers from '../../components/Provider/listagem';



export default function providerindex() {
    return <Layout title="Empresa Cadastradas">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/provider/add">Nova Empresa</Button>
        </Row>
        <Providers mostrar={true}></Providers>
    </Layout>;
}