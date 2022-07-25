import { Table, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Api } from '../../services/api';

export default function Employees({ mostrar }) {
  const [bankaccount, setBankAccount] = useState([]);
  const router = useRouter();
  const api = new Api('/employee');

  useEffect(() => listar(), []);

  const listar = () => {
    api.listar()
      .then(res => {
        setBankAccount(res.data);
      })
      .catch(err => router.push('/login'));
  };

  // const provdesc = (provento) => {
  //   if ( provento == 1 || provento == "1" )
  //   { return "Provento" }else{return "Desconto"}
     
    
  // };



  const handleDelete = (id) => {
    if (confirm("Deseja cancelar o vinculo?")) {
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
        <td>Nome</td>
        <td>Empresa</td>
        <td>Cargo</td>
        <td>Verba</td>
        <td>Plano de Saúde</td>
       
        {mostrar && <td style={{ width: 200 }}>Ações</td>}
      </tr>
    </thead>
    <tbody>
      {bankaccount?.map((comp) => (
        <tr key={comp.id}>
          <td>{comp.people.name}</td>
          <td>{comp.company.corporateName}</td>
          <td>{comp.profession.professionName}</td>
          <td>{comp.funds.name} | {comp.funds.provento}</td>
          <td>{comp.healthPlan.operadora}</td>

          {mostrar && <td><Button variant="info" href={"employee/" + comp.id}>Editar</Button><Button className="ml-2" onClick={() => handleDelete(comp.id)} variant="danger">Remover</Button>
          </td>}
        </tr>
      ))
      }
    </tbody>
  </Table>;
}

Employees.defaultProps = {
  mostrar: false
};