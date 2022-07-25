import { Table, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Api } from '../../services/api';

export default function Healthplans({ mostrar }) {
  const [healthPlan, sethealthPlan] = useState([]);
  const router = useRouter();
  const api = new Api('/healthplan');

  useEffect(() => listar(), []);

  const listar = () => {
    api.listar()
      .then(res => {
        //alert(res.data.length)
        sethealthPlan(res.data);
      })
      .catch(err => router.push('/login'));
  };

  const handleDelete = (id) => {
    if (confirm("Deseja remover o Plano de Saúde?")) {
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
        <td>Operadora</td>
        <td>Código ANS</td>
        {mostrar && <td style={{ width: 200 }}>Ações</td>}
      </tr>
    </thead>
    <tbody>
      {healthPlan?.map((comp) => (
        <tr key={comp.id}>
          <td>{comp.operadora}</td>
          <td>{comp.codigoAns}</td>
          {mostrar && <td><Button variant="info" href={"healthplan/" + comp.id}>Editar</Button><Button className="ml-2" onClick={() => handleDelete(comp.id)} variant="danger">Remover</Button>
          </td>}
        </tr>
      ))
      }
    </tbody>
  </Table>;
}

Healthplans.defaultProps = {
  mostrar: false
};