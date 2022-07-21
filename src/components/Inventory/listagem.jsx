import { Table, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Api } from '../../services/api';

export default function Inventorys({ mostrar }) {
  const [bankaccount, setBankAccount] = useState([]);
  const router = useRouter();
  const api = new Api('/inventory');

  useEffect(() => listar(), []);

  const listar = () => {
    api.listar()
      .then(res => {
        setBankAccount(res.data);
      })
      .catch(err => router.push('/login'));
  };

  const handleDelete = (id) => {
    if (confirm("Deseja remover?")) {
      try {
        api.remover(id)
          .then(res => listar())
          .catch(err => alert(err));
      } catch (error) {
        alert(error);
      }
    }
  };

  return <Table striped bordered hover >
    <thead>
      <tr>
        <td>Produto</td>
        <td>QTDE</td>
        <td>Preço Estimado da Venda</td>
        <td>Lucro Previsto</td>
        {mostrar && <td style={{ width: 200 }}>Ações</td>}
      </tr>
    </thead>


    <tbody>
      {bankaccount?.map((comp) => (
        <tr key={comp.id}>
          <td>{comp.products.nameProduct}</td>
          <td>{comp.qtde}</td>
          <td> R$ {comp.estimatedSalePrice}</td>
          <td> R$ { (comp.estimatedSalePrice - comp.products.value ) * comp.qtde } </td>

          {mostrar && <td><Button variant="info" href={"inventory/" + comp.id}>Editar</Button><Button className="ml-2" onClick={() => handleDelete(comp.id)} variant="danger">Remover</Button>
          </td>}
        </tr>
      ))
      }
    </tbody>
  </Table>;
}

Inventorys.defaultProps = {
  mostrar: false
};