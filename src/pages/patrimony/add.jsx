import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import FormPatrimony from '../../components/Patrimony/formpatrimony';

export default function AddBankAcoount() {
    return <Layout title="Dados do Patrimônio">
        <FormPatrimony></FormPatrimony>
    </Layout>;
}