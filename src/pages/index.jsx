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
                        <td>201911316012</td>
                    </tr>
                    <tr>
                        <td>ADAHYLTON BARLATI TENÓRIO </td>
                        <td>201811316041</td>
                    </tr>
                    <tr>
                        <td>RODRIGO SILVA NASCIMENTO MOURA</td>
                        <td>201711316047</td>
                    </tr>
                    <tr>
                        <td>JOÃO MATHEUS DE PAULA CAMPOS</td>
                        <td>201811316030</td>
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
                        <td>Leis (LAW_TB)</td>
                        <td><Button variant="info" href={"law/"}>ACESSAR</Button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Taxas/Impostos (TAX_TB)</td>
                        <td><Button variant="info" href={"tax/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>4</td>
                        <td>Company/Empresas (COMPANY_TB)</td>
                        <td><Button variant="info" href={"Company/"}>ACESSAR</Button></td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Contas bancárias (BANK_ACCOUNT_TB)</td>
                        <td><Button variant="info" href={"bankaccount/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>6</td>
                        <td>Depositos e retiradas (BANK_DEPOSIT_TB)</td>
                        <td><Button variant="info" href={"bankdeposit/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>7</td>
                        <td>Plano de Contas (ACCOUNT_CHART_TB)</td>
                        <td><Button variant="info" href={"accountchart/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>8</td>
                        <td>Patrimonio (PATRIMONY_TB)</td>
                        <td><Button variant="info" href={"patrimony/"}>ACESSAR</Button></td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>Formas de pagamento (PAYMENT_FORM_TB)</td>
                        <td><Button variant="info" href={"paymentform/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>10</td>
                        <td>Clientes (CUSTOMER_TB)</td>
                        <td><Button variant="info" href={"customer/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>11</td>
                        <td>Fornecedores (PROVIDER_TB)</td>
                        <td><Button variant="info" href={"provider/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>12</td>
                        <td>Dívidas a pagar (BILLS_TO_PAY_TB)</td>
                        <td><Button variant="info" href={"billstopay/"}>ACESSAR</Button></td>
                    </tr>


                    <tr>
                        <td>13</td>
                        <td>Contas a receber (ENTRY_PAY_TB)</td>
                        <td><Button variant="info" href={"entrypay/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>14</td>
                        <td>Produtos (PRODUCTS_TB)</td>
                        <td><Button variant="info" href={"products/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>15</td>
                        <td>Estoque (INVENTORY_TB)</td>
                        <td><Button variant="info" href={"inventory/"}>ACESSAR</Button></td>
                    </tr>
                    <tr>
                        <td>16</td>
                        <td>Vendas (SALE_TB)</td>
                        <td><Button variant="info" href={"sale/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>17</td>
                        <td>Relação Venda - Produto (products_sale)</td>
                        <td><Button variant="info" href={"sale/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>18</td>
                        <td>Relação Venda - Produto (products_sale)</td>
                        <td><Button variant="info" href={"sale/"}>ACESSAR</Button></td>
                    </tr>                    
                
                
                    <tr>
                        <td>19</td>
                        <td>BANK (BANK_TB)</td>
                        <td><Button variant="info" href={"bank/"}>ACESSAR</Button></td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td>Cargos (professions_tb)</td>
                        <td><Button variant="info" href={"professions/"}>ACESSAR</Button></td>
                    </tr>
                    
                    <tr>
                        <td>21</td>
                        <td>Verbas (funds_tb)</td>
                        <td><Button variant="info" href={"funds/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>22</td>
                        <td>Setores (Sector_TB)</td>
                        <td><Button variant="info" href={"sector/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>23</td>
                        <td>Planos de Saúde (health_plan_tb)</td>
                        <td><Button variant="info" href={"healthplan/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>24</td>
                        <td>Planos de Saúde (health_plan_tb)</td>
                        <td><Button variant="info" href={"healthplan/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>25</td>
                        <td>Dados Pessoais (personal_data_tb)</td>
                        <td><Button variant="info" href={"personaldata/"}>ACESSAR</Button></td>
                    </tr>
                 

                    <tr>
                        <td>25</td>
                        <td>Colaboradores (employee_tb)</td>
                        <td><Button variant="info" href={"employee/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>26</td>
                        <td>Funcionários (employee_tb)</td>
                        <td><Button variant="info" href={"employee/"}>ACESSAR</Button></td>
                    </tr>

                    <tr>
                        <td>27</td>
                        <td>Dados Bancários Funcionários (bank_account_employee_tb)</td>
                        <td><Button variant="info" href={"bankaccountemployee/"}>ACESSAR</Button></td>
                    </tr>
                 
                    <tr>
                        <td>28</td>
                        <td>Ordem de Pagamento (Funcionários) (payroll_tb)</td>
                        <td><Button variant="info" href={"payroll/"}>ACESSAR</Button></td>
                    </tr>
                 
                </tbody>
            </Table>

        </Container>
    </Layout>;
}