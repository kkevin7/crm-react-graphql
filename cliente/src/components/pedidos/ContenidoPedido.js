import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/animated';
import Resumen from './Resumen';

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
        // console.log(cantidad)
        let nuevoTotal =0;

        // leer el state de productos
        const productos = this.state.productos;
        if(productos.length === 0){
            this.setState({
                total: nuevoTotal
            });
            return;
        }

        // aregar la cantidad desde la interfaz
        productos[index].cantidad = Number(cantidad);

        // realizar la opéracion de cantidad x precio
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        //actualizar la cantidad de productos

        //validadmos

        //agregamos al state
        this.setState({
            productos,
            total: nuevoTotal.toFixed(2)
        })
    }

    render() {
        return (
            <Fragment>
                <h2 className="text-center mb-5">Seleccionar Artículos</h2>
                <Select 
                onChange={this.seleccionarProducto}
                options={this.props.productos}
                isMulti={true}
                components={Animated()}
                placeholder="Seleccionar Productos"
                getOptionValue={(options) => options.id}
                getOptionLabel={(options) => options.nombre}
             />
             <Resumen
                productos={this.state.productos}
                actualizarCantidad={this.actualizarCantidad}
             />
             <p className="font-weight-bold float-right">
                 Total: <span className="font-weight-normal">
                     $ {this.state.total}
                 </span>
             </p>
            </Fragment>
        );
    }
}

export default ContenidoPedido;