import { Table, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Api } from '../../services/api';

export default function BankAccounts({ mostrar }) {
  const [bankaccount, setBankAccount] = useState([]);
  const router = useRouter();
  const api = new Api('/bank-account');

  useEffect(() => listar(), []);

  const listar = () => {
    api.listar()
      .then(res => {
        //alert(res.data.length)
        setBankAccount(res.data);
      })
      .catch(err => router.push('/login'));
  };

  const handleDelete = (id) => {
    if (confirm("Deseja remover a Compania?")) {
      try {
        api.remover(id)
          .then(res => listar())
          .catch(err => alert(err));
      } catch (error) {
        alert(error);
      }
    }
  };


  return <Table striped bordered hover>
    <thead>
      <tr>
        <td>Agência</td>
        <td>Conta</td>
        <td>Código Banco</td>
        {mostrar && <td style={{ width: 200 }}>Ações</td>}
      </tr>
    </thead>
    <tbody>
      {bankaccount?.map((comp) => (
        <tr key={comp.id}>
          <td>{comp.agencyNumber}</td>
          <td>{comp.accountNumber}</td>
          <td>{comp.bank}</td>

          {mostrar && <td><Button variant="info" href={"bankaccount/" + comp.id}>Editar</Button><Button className="ml-2" onClick={() => handleDelete(comp.id)} variant="danger">Remover</Button>
          </td>}
        </tr>
      ))
      }
    </tbody>
  </Table>;
}

BankAccounts.defaultProps = {
  mostrar: false
};