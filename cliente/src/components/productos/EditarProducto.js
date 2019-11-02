import React, { Component, Fragment } from 'react';
import {Query} from 'react-apollo';
import {OBTENER_PRODUCTO} from '../../queries';
import FormularioEditarProducto from './FormularioEditarProducto';

class EditarProducto extends Component {

    state = {  };

    render() {
        const {id} = this.props.match.params;
        console.log(id);
        return (
            <Fragment>
                <h1 className="text-center">Editar Producto</h1>
                <div className="row justify-content-center">
                    <Query query={OBTENER_PRODUCTO} variables={{id}}>
                        {({loading, error, data, refetch}) => {
                            if(loading) return "Cargando...";
                            if(error) return `Error ${error.mensaje}`;
                            console.log(data);
                            return (
                                <FormularioEditarProducto
                                    producto={data}
                                    id={id}
                                    refetch={refetch}
                                />
                            )
                        }}
                    </Query>
                </div>
            </Fragment>
        );
    }
}

export default EditarProducto;