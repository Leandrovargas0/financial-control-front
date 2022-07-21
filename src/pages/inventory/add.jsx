import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import FormInventory from '../../components/Inventory/forminventory';

export default function AddInventory() {
    return <Layout title="Produto/Valor/Quantidade (Estoque)">
        <FormInventory></FormInventory>
    </Layout>;
}