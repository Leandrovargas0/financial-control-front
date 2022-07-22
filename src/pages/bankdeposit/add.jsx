import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import FormPatrimony from '../../components/Bankdeposit/formpatrimony';

export default function AddBankAcoount() {
    return <Layout title="Dados do Deposito/retirada">
        <FormPatrimony></FormPatrimony>
    </Layout>;
}