import { Component } from "react";
import { Api } from '../../services/api';
import { Table, Button } from 'react-bootstrap';


const options = [];

const inicial = {
    id: 0,
    itenss: [],
    api4: new Api('/itempay'),
}


class ItempayTable extends Component {
    constructor(props) {
        super(props);
        this.state = inicial;       
    }

    componentDidMount() {
        try {
            const isID = this.props.payroll_id;
            
            if (isID != undefined) {
                this.state.api4.listar()
                    .then((res) => {
                        var dados = res.data;
                        dados.forEach(e => {

                            if( e.payroll.id == isID){

                                options.push(
                                        {
                                            id: e.id,
                                            valor: e.valor,
                                            funds: e.funds.name,
                                            payroll: e.payroll.id,
                                            ano: e.payroll.payYear,
                                            mes: e.payroll.payMount
                                        }
                                    );
                                }
                        });
                    })
                    .catch(err => console.log('Deu erro né 0'));
            }
        } catch (erro) {
            console.log('Deu erro né 1');
        }
    }

    handleDelete = (id) => {
        if (confirm("Deseja remover o Registro?")) {
          try {
            this.state.api4.remover(id)
              .then(res => {
                router.push('../');
              })
              .catch(err => alert(err));
          } catch (error) {
            alert(error);
          }
        }
      };
    
    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>Verba</td>
                        <td>Valor</td>
                        <td>Mês/ano</td>
                        <td style={{ width: 200 }}>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {options?.map((comp) => (
                        <tr key={comp.id}>
                            <td>{comp.funds}</td>
                            <td>{comp.valor}</td>
                            <td>{comp.mes}/{comp.ano}</td>
                            <td>
                                <Button className="ml-2" onClick={() => this.handleDelete(comp.id)} variant="danger">Remover</Button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
        )
    }
}

export default ItempayTable;