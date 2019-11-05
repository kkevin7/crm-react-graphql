import React,{Fragment} from 'react';
import {Query} from 'react-apollo';
import {OBTENER_PEDIDO} from '../../queries';
import "../../spinner.css";
import Pedido from './Pedido';

const PedidosCliente = (props) => {
    // console.log(props);
    const cliente = props.match.params.id;
    return(
        <Fragment>
            <h1 className="text-center mb-5">Pedido del Cliente</h1>
            <div className="row">
                <Query query={OBTENER_PEDIDO} variables={{cliente}} pollInterval={500}>
                {({loading, error, data, startPolling, stopPolling}) => {
                    if (loading)
                    return (
                      <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                      </div>
                    );
                    if(error) return `Èrror ${error.message}`;
                    console.log(data);

                    return(
                        data.obtenerPedidos.map(pedido => (
                            <Pedido
                                key={pedido.id}
                                pedido={pedido}
                                cliente={cliente}
                            />
                        ))
                    );
                }}
                </Query>
            </div>
        </Fragment>
    );
}

export default PedidosCliente;