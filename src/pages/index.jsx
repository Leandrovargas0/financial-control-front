import { Container, Table, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout/layout';


export default function homeindex() {
    return <Layout title="Home">
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Aluno</th>
                        <th>RGA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>LEANDRO VINICIUS DA SILVA VARGAS</td>
                        <td>201711316002</td>
                    </tr>
                    <tr>
                        <td>FERNANDA MARTINS LUNA </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>ADAHYLTON BARLATI TENÓRIO </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>RODRIGO SILVA NASCIMENTO MOURA</td>
                    <td></td>
                    </tr>
                    <tr>
                        <td>JOÃO MATHEUS DE PAULA CAMPOS</td>
                    <td></td>
                    </tr>
                </tbody>
            </Table>

            <br/><br/>

            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>Ordem de Cadastros</th>
                        <th>ENTIDADES/MÓDULOS</th>
                        <th>NAVEGAR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Usuários (USER_TB)</td>
                        <td><Button variant="info" href={"login/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>Taxas/Impostos (TAX_TB)</td>
                        <td><Button variant="info" href={"tax/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>Company/Empresas (COMPANY_TB)</td>
                        <td><Button variant="info" href={"Company/"}>ACESSAR</Button></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Contas bancárias (BANK_ACCOUNT_TB)</td>
                        <td><Button variant="info" href={"bankaccount/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>5</td>
                        <td>Depositos e retiradas (BANK_DEPOSIT_TB)</td>
                        <td><Button variant="info" href={"bankdeposit/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>6</td>
                        <td>Plano de Contas (ACCOUNT_CHART_TB)</td>
                        <td><Button variant="info" href={"accountchart/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>7</td>
                        <td>Patrimonio (PATRIMONY_TB)</td>
                        <td><Button variant="info" href={"patrimony/"}>ACESSAR</Button></td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>Formas de pagamento (PAYMENT_FORM_TB)</td>
                        <td><Button variant="info" href={"paymentform/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>9</td>
                        <td>Clientes (CUSTOMER_TB)</td>
                        <td><Button variant="info" href={"customer/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>10</td>
                        <td>Fornecedores (PROVIDER_TB)</td>
                        <td><Button variant="info" href={"provider/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>11</td>
                        <td>Dívidas a pagar (BILLS_TO_PAY_TB)</td>
                        <td><Button variant="info" href={"billstopay/"}>ACESSAR</Button></td>
                    </tr>


                    <tr>
                        <td>12</td>
                        <td>Contas a receber (ENTRY_PAY_TB)</td>
                        <td><Button variant="info" href={"entrypay/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>13</td>
                        <td>Produtos (PRODUCTS_TB)</td>
                        <td><Button variant="info" href={"products/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>14</td>
                        <td>Estoque (INVENTORY_TB)</td>
                        <td><Button variant="info" href={"inventory/"}>ACESSAR</Button></td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>Vendas (SALE_TB)</td>
                        <td><Button variant="info" href={"sale/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>16</td>
                        <td>Relação Venda - Produto (products_sale)</td>
                        <td><Button variant="info" href={"sale/"}>ACESSAR</Button></td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    </Layout>;
}