import { Table, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Api } from '../../services/api';

export default function Patimonies({ mostrar }) {
  const [bankaccount, setBankAccount] = useState([]);
  const router = useRouter();
  const api = new Api('/patrimony');

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
        <td>Item</td>
        <td>Valor</td>
        <td>Vida Útil</td>
        <td>Data Compra</td>
        <td>Conta Patrimonial</td>
        {mostrar && <td style={{ width: 200 }}>Ações</td>}
      </tr>
    </thead>
    <tbody>
      {bankaccount?.map((comp) => (
        <tr key={comp.id}>
          <td>{comp.namePatrimony}</td>
          <td>R$ {comp.valuePatrimony}</td>
          <td>{comp.lifespan} Anos</td>
          <td>{comp.buyDate}</td>
          <td>{comp.accountChart.description}</td>
          {mostrar && <td><Button variant="info" href={"patrimony/" + comp.id}>Editar</Button><Button className="ml-2" onClick={() => handleDelete(comp.id)} variant="danger">Remover</Button>
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