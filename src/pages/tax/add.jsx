import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import FormTax from '../../components/Tax/formtax';

export default function AddTax() {
    return <Layout title="Nova Taxa/Imposto">
        <FormTax></FormTax>
    </Layout>;
}