import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../components/Layout/layout';
import FormHealthPlan from '../../components/Healthplan/formhealthplan';

export default function AddHealthPlan() {
    return <Layout title="Dados do Plano de Saude">
        <FormHealthPlan></FormHealthPlan>
    </Layout>;
}