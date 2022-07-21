import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import FormBillsToPay from '../../components/Billstopay/formbillstopay';

export default function AddBills() {
    return <Layout title="Dados da Conta a Pagar">
        <FormBillsToPay></FormBillsToPay>
    </Layout>;
}