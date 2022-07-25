import { Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import Laws from '../../components/Law/listagem';


export default function lawIndex() {
    return <Layout title="Impostos">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/law/add">Nova Lei</Button>
        </Row>
        <Laws mostrar={true}></Laws>
    </Layout>;
}