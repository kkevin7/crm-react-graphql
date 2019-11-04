import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/animated';
import Resumen from './Resumen';
import GenerarPedido from './GenerarPedido';
import Error from '../alertas/Error';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class ContenidoPedido extends Component {
    state = {  
        productos: [],
        total: 0
    }

    seleccionarProducto = (productos) => {
        // console.log(`Algo paso con `, productos)
        this.setState({
            productos
        })
    }

    actualizarCantidad = (cantidad, index) =>{
        
        // leer el state de productos
        const productos = this.state.productos;
        
        // aregar la cantidad desde la interfaz
        productos[index].cantidad = Number(cantidad);

        this.setState({
            productos,
        }, () => {
            this.actualizarTotal()
        })
    }

    actualizarTotal = () =>{
        const productos = this.state.productos;

        if(productos.length === 0){
            this.setState({
                total: 0
            });
            return;
        }

        let nuevoTotal =0;

        // realizar la opéracion de cantidad x precio
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        this.setState({
            total: nuevoTotal.toFixed(2)
        });
    }

    eliminarProducto  = (id) =>{
        const productos = this.state.productos;
        const productosRestantes = productos.filter(producto => producto.id !== id);
        this.setState({
            productos: productosRestantes
        }, () => {
            this.actualizarTotal();
        });
    }

    render() {
        const mensaje = (this.state.total <0) ? <Error error="Las cantidades no pueden ser negativas"/>: "";
        return (
            <Fragment>
                <h2 className="text-center mb-5">Seleccionar Artículos</h2>
                {mensaje}
                <Select 
                onChange={this.seleccionarProducto}
                options={this.props.productos}
                isMulti={true}
                components={Animated()}
                placeholder="Seleccionar Productos"
                getOptionValue={(options) => options.id}
                getOptionLabel={(options) => options.nombre}
                value={this.state.productos}
             />
             <Resumen
                productos={this.state.productos}
                actualizarCantidad={this.actualizarCantidad}
                eliminarProducto={this.eliminarProducto}
             />
             <p className="font-weight-bold float-right">
                 Total: <span className="font-weight-normal">
                     $ {this.state.total}
                 </span>
             </p>
             <GenerarPedido
                productos={this.state.productos}
                total={this.state.total}
                idCliente={this.props.id}
             />
            </Fragment>
        );
    }
}

export default ContenidoPedido;