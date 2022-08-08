import { Table, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Api } from '../../services/api';

export default function Payrolls({ mostrar }) {
  const [payroll, setPayroll] = useState([]);
  const router = useRouter();
  const api = new Api('/payroll');


  useEffect(() => listar(), []);

  const listar = () => {
    api.listar()
      .then(res => {
        setPayroll(res.data);
      })
      .catch(err => router.push('/login'));
  };

  const handleDelete = (id) => {
    if (confirm("Deseja remover o Registro?")) {
      try {
        api.remover(id)
          .then(res => listar())
          .catch(err => alert(err));
      } catch (error) {
        alert(error);
      }
    }
  };

  const pushId = (id) => {
    var token = id;

    window.localStorage.setItem("payroll_id", token);
    router.push('payroll/' + id);

  }


  return <Table striped bordered hover>
    <thead>
      <tr>
        <td>Nome</td>

        {mostrar && <td style={{ width: 200 }}>Ações</td>}
      </tr>
    </thead>
    <tbody>
      {payroll?.map((comp) => (
        <tr key={comp.id}>
          <td>{comp.employee.people.name}</td>

          {/* <td>{comp.employee.people.name}</td>
          <td>{comp.employee.people.cpf}</td>
          <td>{comp.employee.profession.professionName}</td>
          <td>{comp.employee.funds.name}</td>
          <td>R$ {comp.valorBruto}</td>
          <td>R$ {comp.valorDesconto}</td>
          <td>R$ {comp.valorLiquido}</td>
          <td>{comp.dataPagamento}</td> */}

          {mostrar && <td>
            <Button variant="info" onClick={() => pushId(comp.id)} >
              Editar
          </Button>

            <Button className="ml-2" onClick={() => handleDelete(comp.id)}
              variant="danger">Remover</Button>
          </td>}
        </tr>
      ))
      }
    </tbody>
  </Table>;
}

Payrolls.defaultProps = {
  mostrar: false
};