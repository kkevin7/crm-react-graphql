import React, { Component, Fragment } from "react";
import {NUEVO_CLIENTE} from '../../mutations';
import {Mutation } from 'react-apollo';

class NuevoCliente extends Component {
  state = {
    cliente: {
      nombre: '',
      apellido: '',
      empresa: '',
      edad: '',
      email: '',
      tipo: ''
    },
    error : false
  };
  render() {
    const {error} = this.state;
    let respuesta = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son Obligatorios</p> : '';
    return (
      <Fragment>
        <h2 className="text-center">Nuevo Cliente</h2>
        {respuesta}
        <div className="row justify-content-center">
          <Mutation mutation={NUEVO_CLIENTE}
            onCompleted={() => this.props.history.push('/')}>
            {crearCliente => ( 
          <form
            className="col-md-8 m-3"
            onSubmit={e => {
              e.preventDefault();
              const {
                nombre,
                apellido,
                empresa,
                edad,
                tipo,
                email
              } = this.state.cliente;

              //verificar si las variables esta vacias
              if(nombre === '' || apellido === '' || empresa === '' || edad === '' || tipo === '' ){
                this.setState({
                  error: true
                });
                return true;
              }

              //cambiar el estado del error
              this.setState({
                error: false
              })

              const input = {
                nombre,
                apellido,
                empresa,
                edad: Number(edad),
                tipo,
                email
              };

              console.log(input)

              crearCliente({
                variables: {input}
              })
            }}
          >
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        nombre: e.target.value
                      }
                    });
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido"
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        apellido: e.target.value
                      }
                    });
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Empresa</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Empresa"
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        empresa: e.target.value
                      }
                    });
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        email: e.target.value
                      }
                    });
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Edad</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Edad"
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        edad: e.target.value
                      }
                    });
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Tipo Cliente</label>
                <select
                  className="form-control"
                  onChange={e => {
                    this.setState({
                      cliente: {
                        ...this.state.cliente,
                        tipo: e.target.value
                      }
                    });
                  }}
                >
                  <option value="">Elegir...</option>
                  <option value="PREMIUM">PREMIUM</option>
                  <option value="BASICO">BÁSICO</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success float-right">
              Guardar Cambios
            </button>
          </form>
          )}
          </Mutation>
        </div>
      </Fragment>
    );
  }
}

export default NuevoCliente;
