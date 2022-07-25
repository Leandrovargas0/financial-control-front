import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import FormLaw from '../../components/Law/formlaw';

export default function AddLaw() {
    return <Layout title="Nova Lei">
        <FormLaw></FormLaw>
    </Layout>;
}