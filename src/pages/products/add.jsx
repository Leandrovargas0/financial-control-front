import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import FormProducts from '../../components/Products/formproducts';

export default function AddProducts() {
    return <Layout title="Dados do Produto">
        <FormProducts></FormProducts>
    </Layout>;
}