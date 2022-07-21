import { Table, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Api } from '../../services/api';

export default function BillsToPays({ mostrar }) {
  const [bankaccount, setBankAccount] = useState([]);
  const router = useRouter();
  const api = new Api('/bills-to-pay');

  useEffect(() => listar(), []);

  const listar = () => {
    api.listar()
      .then(res => {
        setBankAccount(res.data);
      })
      .catch(err => router.push('/login'));
  };

  const handleDelete = (id) => {
    if (confirm("Deseja remover este recibo de pagamento?")) {
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
        <td>Nº Doc</td>
        <td>Valor DOC</td>
        <td>Emissão</td>
        <td>Vencimento</td>
        <td>Empresa/Fornecedor</td>
        {mostrar && <td style={{ width: 200 }}>Ações</td>}
      </tr>
    </thead>
    <tbody>
      {bankaccount?.map((comp) => (
        <tr key={comp.id}>
          <td>{comp.docNumber}</td>
          <td>{comp.titleValue}</td>
          <td>{comp.emissionDate}</td>
          <td>{comp.dueDate}</td>
          <td>{comp.company.corporateName}/{comp.provider.corporateName}</td>
          {mostrar && <td><Button variant="info" href={"billstopay/" + comp.id}>Editar</Button><Button className="ml-2" onClick={() => handleDelete(comp.id)} variant="danger">Remover</Button>
          </td>}
        </tr>
      ))
      }
    </tbody>
  </Table>;
}

BillsToPays.defaultProps = {
  mostrar: false
};