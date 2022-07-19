import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';

import FormEntrypay from '../../components/Entrypay/formentrypay';

export default function AddBankAcoount() {
    return <Layout title="Dados da Conta a Receber">
        <FormEntrypay></FormEntrypay>
    </Layout>;
}