import { Table, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Api } from '../../services/api';

export default function Companies({ mostrar }) {
  const [company, setCompany] = useState([]);
  const router = useRouter();
  const api = new Api('/personaldata');

  useEffect(() => listar(), []);

  const listar = () => {
    api.listar()
      .then(res => {
        setCompany(res.data);
      })
      .catch(err => router.push('/login'));
  };

  const handleDelete = (id) => {
    if (confirm("Deseja remover a pessoa?")) {
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
        <td>CPF</td>
        <td>Nome</td>
        <td>Nascimento</td>
      
        {mostrar && <td style={{ width: 200 }}>Ações</td>}
      </tr>
    </thead>
    <tbody>
      {company?.map((comp) => (
        <tr key={comp.id}>
          <td>{comp.cpf}</td>
          <td>{comp.name}</td>
          <td>{comp.birthDate}</td>
          
          {mostrar && <td><Button variant="info" href={"personaldata/" + comp.id}>Editar</Button><Button className="ml-2" onClick={() => handleDelete(comp.id)} variant="danger">Remover</Button>
          </td>}
        </tr>
      ))
      }
    </tbody>
  </Table>;
}

Companies.defaultProps = {
  mostrar: false
};