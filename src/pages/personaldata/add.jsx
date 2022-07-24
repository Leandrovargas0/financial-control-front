import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import FormPersonalData from '../../components/Personaldata/formpersonaldata';

export default function AddPessoa() {
    return <Layout title="Dados da Pessoa">
        <FormPersonalData></FormPersonalData>
    </Layout>;
}