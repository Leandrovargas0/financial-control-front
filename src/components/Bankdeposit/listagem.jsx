import { Table, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Api } from '../../services/api';

export default function Patimonies({ mostrar }) {
  const [bankaccount, setBankAccount] = useState([]);
  const router = useRouter();
  const api = new Api('/bank-deposit');

  useEffect(() => listar(), []);

  const listar = () => {
    api.listar()
      .then(res => {
        setBankAccount(res.data);
      })
      .catch(err => router.push('/login'));
  };

  const handleDelete = (id) => {
    if (confirm("Deseja remover este item?")) {
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
        <td>Tipo </td>
        <td>Valor</td>
        <td>Dados</td>
        {mostrar && <td style={{ width: 200 }}>Ações</td>}
      </tr>
    </thead>
    <tbody>
      {bankaccount?.map((comp) => (
        <tr key={comp.id}>
          <td>{comp.isDeposit == 1 ? "depósito":"retirada"}</td>
          <td>R$ {comp.value}</td>
          <td>{comp.bankAccount.description}-{comp.bankAccount.agencyNumber}-{comp.bankAccount.accountNumber}</td>

          {mostrar && <td><Button variant="info" href={"bankdeposit/" + comp.id}>Editar</Button><Button className="ml-2" onClick={() => handleDelete(comp.id)} variant="danger">Remover</Button>
          </td>}
        </tr>
      ))
      }
    </tbody>
  </Table>;
}

Patimonies.defaultProps = {
  mostrar: false
};