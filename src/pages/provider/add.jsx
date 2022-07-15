import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import FormProvider from '../../components/Provider/formprovider';

export default function AddCompany() {
    return <Layout title="Dados da Empresa">
        <FormProvider></FormProvider>
    </Layout>;
}