import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import FormSale from '../../components/Sale/formsale';

export default function AddProducts() {
    return <Layout title="Dados da Venda">
        <FormSale></FormSale>
    </Layout>;
}