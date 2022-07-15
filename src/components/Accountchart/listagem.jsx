import { Table, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Api } from '../../services/api';

export default function AccountCharts({ mostrar }) {
  const [bankaccount, setBankAccount] = useState([]);
  const router = useRouter();
  const api = new Api('/account-chart');

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
    if (confirm("Deseja remover este plano de contas?")) {
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
        <td>Banco</td>
        {mostrar && <td style={{ width: 200 }}>Ações</td>}
      </tr>
    </thead>
    <tbody>
      {bankaccount?.map((comp) => (
        <tr key={comp.id}>
          <td>{comp.classification}</td>
          <td>{comp.accountType}</td>
          <td>{comp.description}</td>

          {mostrar && <td><Button variant="info" href={"accountchart/" + comp.id}>Editar</Button><Button className="ml-2" onClick={() => handleDelete(comp.id)} variant="danger">Remover</Button>
          </td>}
        </tr>
      ))
      }
    </tbody>
  </Table>;
}

AccountCharts.defaultProps = {
  mostrar: false
};