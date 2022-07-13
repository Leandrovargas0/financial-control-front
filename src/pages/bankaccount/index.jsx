import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import BankAccounts from '../../components/Bankaccount/listagem';



export default function bankAccountIndex() {
    return <Layout title="Contas Bancárias Vinciladas à sua empresa">
        <Row className="float-right row pb-2 pr-5">
            <Button variant="primary" href="/bankaccount/add">Nova conta</Button>
        </Row>
        <BankAccounts mostrar={true}></BankAccounts>
    </Layout>;
}