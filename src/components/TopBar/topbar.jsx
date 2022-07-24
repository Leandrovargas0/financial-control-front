import { useRouter } from "next/router";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useEffect, useState } from "react";
import isAuthenticated from '../../services/isAuthenticated';

export default function TopBar() {
  const [montar, setMontar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    var auth = isAuthenticated();
    if (!auth) {
      router.push('/login');
    }
    setMontar(auth);
  });
  return (montar &&
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/"></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>


          

          <NavDropdown title="Cadastros" id="basic-nav-dropdown">
            <NavDropdown.Item href="/company">Empresas (Company)</NavDropdown.Item>
            <NavDropdown.Item href="/bankaccount">Contas Bancárias (Bank Account)</NavDropdown.Item>
            <NavDropdown.Item href="/accountchart">Planos de Contas (Account Chart)</NavDropdown.Item>
            <NavDropdown.Item href="/paymentform">Forma de Pagamento (Payment Form)</NavDropdown.Item>
            <NavDropdown.Item href="/customer">Clientes (Customers)</NavDropdown.Item>
            <NavDropdown.Item href="/provider">Fornecedores (Providers)</NavDropdown.Item>
            <NavDropdown.Item href="/products">Produtos (Products)</NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item href="/login">
              Sair
            </NavDropdown.Item>
          </NavDropdown>

          
          <NavDropdown title="Pessoal" id="basic-nav-dropdown">
            <NavDropdown.Item href="/bank">Bancos (bank)</NavDropdown.Item>


            <NavDropdown.Divider />
            <NavDropdown.Item href="/login">
              Sair
            </NavDropdown.Item>
          </NavDropdown>


          <NavDropdown title="Movimentos" id="basic-nav-dropdown">
            <NavDropdown.Item href="/entrypay">Contas a Receber</NavDropdown.Item>
            <NavDropdown.Item href="/billstopay">Contas a Pagar</NavDropdown.Item>
            <NavDropdown.Item href="/inventory">Estoque</NavDropdown.Item>
            <NavDropdown.Item href="/patrimony">Patrimônio</NavDropdown.Item>
            <NavDropdown.Item href="/bankdeposit">Movimentação (Banco)</NavDropdown.Item>
            
            <NavDropdown.Divider />
            <NavDropdown.Item href="/login">
              Sair
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Área Legal" id="basic-nav-dropdown">
            <NavDropdown.Item href="/tax">Impostos</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/login">
              Sair
            </NavDropdown.Item>
          </NavDropdown>

          <Nav className="mr-auto">
          <Nav.Link href="/sale">Vendas</Nav.Link>
        </Nav>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}