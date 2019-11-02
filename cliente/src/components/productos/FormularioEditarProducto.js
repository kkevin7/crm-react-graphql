import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import {ACTUALIZAR_PRODUCTO} from '../../mutations';
import {withRouter} from 'react-router-dom';

const initialState = {
    nombre: '',
    precio: '',
    stock: ''
}

class FormularioEditarProducto extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ...this.props.producto.obtenerProducto
         };
    }

    limpiarState = () =>{
        this.setState({
            ...initialState
        })
    }

    actualizarState = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    validarForm = () => {
        const {nombre, precio, stock} = this.state;
        const noValido = !nombre || !precio || !stock;
        return noValido;
    }

    editarProductoForm = (e, actualizarProducto) => {
        e.preventDefault();
        actualizarProducto().then(data => {
            // console.log(data);
            this.setState({
                ...initialState
            })
        })
    }


    render() {
        const {nombre, precio, stock} = this.state;
        const {id} = this.props;
        const input = {
            id,
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        }

        return (
            <Mutation 
                mutation={ACTUALIZAR_PRODUCTO}
                variables={{input}}
                key={id}
                onCompleted={() => this.props.refetch().then(() => {
                    this.props.history.push('/productos');
                })}
                >
                    {(actualizarProducto, {loading, error, data}) => {
                        return(
                        <form
                        className="col-md-8"
                        onSubmit={e => this.editarProductoForm(e, actualizarProducto)}
                    >
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                placeholder="Nombre del Producto"
                                onChange={this.actualizarState}
                                value={nombre}
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input
                                    type="number"
                                    name="precio"
                                    step="0.01"
                                    className="form-control"
                                    placeholder="Precio del Producto"
                                    onChange={this.actualizarState}
                                    value={precio}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Stock:</label>
                            <input
                                type="number"
                                name="stock"
                                className="form-control"
                                placeholder="stock del Producto"
                                onChange={this.actualizarState}
                                value={stock}
                            />
                        </div>
                        <button
                            disabled={this.validarForm()}
                            type="submit"
                            className="btn btn-success float-right">
                            Modificar Producto
                            </button>
                    </form>
                        );
                    }}
            </Mutation>
        );
    }
}

export default withRouter(FormularioEditarProducto);