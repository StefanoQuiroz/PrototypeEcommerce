import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Login.scss';

const Login = () => {

    
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    
    const history = useHistory();
    const home = (event) => {
        history.push("/")
    }

    const onChange = (event) => {
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]:value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post("/api/login", user)
            .then(response => {
                if(response.data && !response.data.error){
                    home(event);
                } else {
                    Swal.fire({
                        icon:"error",
                        title: "Error - Login",
                        text: response.data.message
                    })
                }
            });
        }

    const {email, password} = user;
    return (
        <div className="loginPage">
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} required/>
                <input type="password" name="password" value={password} placeholder="Contraseña" onChange={onChange} required/>
                <div className="row">
                    <button type="submit">Login</button>
                    <Link to={`/register`}>Registrarse</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
