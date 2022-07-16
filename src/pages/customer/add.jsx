import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import FormCustomer from '../../components/Customer/formcustomer';

export default function AddCompany() {
    return <Layout title="Dados do Cliente">
        <FormCustomer></FormCustomer>
    </Layout>;
}