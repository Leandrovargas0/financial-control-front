import { Table, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Api } from '../../services/api';

export default function Banks({ mostrar }) {
  const [bank, setbank] = useState([]);
  const router = useRouter();
  const api = new Api('/bank');

  useEffect(() => listar(), []);

  const listar = () => {
    api.listar()
      .then(res => {
        //alert(res.data.length)
        setbank(res.data);
      })
      .catch(err => router.push('/login'));
  };

  const handleDelete = (id) => {
    if (confirm("Deseja remover o Banco?")) {
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
        <td>Banco</td>
        <td>CNPJ</td>
        <td>Código FEBRABAN</td>
        {mostrar && <td style={{ width: 200 }}>Ações</td>}
      </tr>
    </thead>
    <tbody>
      {bank?.map((comp) => (
        <tr key={comp.id}>
          <td>{comp.nameBank}</td>
          <td>{comp.cnpj}</td>
          <td>{comp.febrabanCode}</td>

          {mostrar && <td><Button variant="info" href={"bank/" + comp.id}>Editar</Button><Button className="ml-2" onClick={() => handleDelete(comp.id)} variant="danger">Remover</Button>
          </td>}
        </tr>
      ))
      }
    </tbody>
  </Table>;
}

Banks.defaultProps = {
  mostrar: false
};