import { Container, Navbar, Nav, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import FormPayroll from '../../components/Payroll/formpayroll';

export default function AddPayroll() {
    return <Layout title="Lançamento de Informações de Pagamento">
        <FormPayroll></FormPayroll>
    </Layout>;
}