import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import FormPaymentForm from '../../components/Paymentform/formpaymentform';

export default function AddPaymentForm() {
    return <Layout title="Nova Forma de Pagamento">
        <FormPaymentForm></FormPaymentForm>
    </Layout>;
}