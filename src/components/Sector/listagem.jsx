import { Table, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Api } from '../../services/api';

export default function Sectors({ mostrar }) {
  const [company, setCompany] = useState([]);
  const router = useRouter();
  const api = new Api('/sector');

  useEffect(() => listar(), []);

  const listar = () => {
    api.listar()
      .then(res => {
        setCompany(res.data);
      })
      .catch(err => router.push('/login'));
      //implementar no back-end

  };

  const handleDelete = (id) => {
    if (confirm("Deseja remover este fornecedor?")) {
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
        <td>Nome do Setor</td>
        <td>Empresa</td>
        {mostrar && <td style={{ width: 200 }}>Ações</td>}
      </tr>
    </thead>
    <tbody>
      {company?.map((comp) => (
        <tr key={comp.id}>
          <td>{comp.nameSector}</td>
          <td>{comp.company.corporateName}-{comp.company.cnpj}</td>
          {mostrar && <td><Button variant="info" href={"sector/" + comp.id}>Editar</Button><Button className="ml-2" onClick={() => handleDelete(comp.id)} variant="danger">Remover</Button>
          </td>}
        </tr>
      ))
      }
    </tbody>
  </Table>;
}

Sectors.defaultProps = {
  mostrar: false
};