import React from 'react'
import update from 'immutability-helper'
import APIInvoker from '../utils/APIInvoker'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    changeField(e) {

        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state, {
            [field]: { $set: value }
        }))
    }

    usernameValidate(e) {
        let username = this.state.username
        APIInvoker.invokeGET(`/users/usernameValidate/${username}`,
            data => {
                this.label.innerHTML = " "
            },
            error => {
                this.label.innerHTML = " la cuenta de usuario no existe"
            })
    }

    iniciarSesion(e) {
        let user = {
            username: this.state.username,
            password: this.state.password
        }

        APIInvoker.invokePOST('/users/login', user, data => {
        
            alert(JSON.stringify(data))
            window.localStorage.setItem('token', data.token)
        }, error => {
            this.pass.innerHTML = error.message
        })
    }



    render() {
        return (
            <div id="Web_1920__1">
                <form className="formulario">
                    <h1>Login</h1>

                    <div className="contenedor">
                        <div className="input-contenedor">
                            <input id="user"
                                name="username"
                                type="text"
                                placeholder="Ingrese su Usuario"
                                value={this.state.username}
                                arial-describedby="emailHelp"
                                onChange={this.changeField.bind(this)}
                                onBlur={this.usernameValidate.bind(this)}
                            />
                            <div className="label-error" ref={self => this.label = self}></div>
                        </div>


                        <div className="input-contenedor">
                            <input name="password"
                                id="password"
                                type="password"
                                placeholder="Ingrese su Contraseña"
                                value={this.state.password}
                                onChange={this.changeField.bind(this)}
                            />
                            <div className="label-error" ref={self => this.pass = self}> </div>
                        </div>


                        <button class="button" type="button" onClick={this.iniciarSesion.bind(this)} >Iniciar sesión</button>

                        <p>Al resistrarte, aceptas nuestras Condiciones de uso y Politica</p>
                        <p>¿No tienes una cuenta?</p>
                        <p>Registrate</p>

                    </div>
                </form>
            </div>
        )
    }

}
export default Login