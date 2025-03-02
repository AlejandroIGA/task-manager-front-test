import React from "react";
import { useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';

function LoginForm() {

    const [user, setUser] = useState("");
    const [psw, setPsw] = useState("");

    const [error, setError] = useState("");

    const [mensaje, setMensaje] = useState("");
    const [mostrar, setMostrar] = useState(false);

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    function handleUserChange(e) {
        let val = e.target.value
        val = val.trim()
        if (val != null) {
            setUser(val)
        }
    }

    function handlePswChange(e) {
        let val = e.target.value
        const hasLetters = /[a-zA-Z]/.test(val);
        const hasNumbers = /\d/.test(val);

        if (val != null) {
            setPsw(val)
            if (!hasLetters) {
                setError("Debe contener por lo menos una letra")
            }

            else if (!hasNumbers) {
                setError("Debe contener por lo menos un número")
            }

            else if (val.length < 10 || val.length >14 ) {
                setError("Debe tener de 10 a 14 caracteres")
            }

            else {
                setError(" ")
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        fetch(`${API_URL}/login`,{
                method: 'GET',
                mode: "cors", 
                headers:{
                    'user': user,
                    'psw':psw
                },
            }).then(response => response.json())
            .then(data => {
                setMensaje(data.msg);
                setMostrar(true);
                if (data.msg == "Credenciales correctas"){
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', data.user);
                    localStorage.setItem('rol', data.rol);
                    //console.log(localStorage.getItem('rol'))
                    navigate('/tablero');
                }
            });
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
            {
                mostrar == true ? <p>{mensaje}</p> : <></>
            }
            <label>Usuario: </label>
            <input type="text"  onChange={handleUserChange} value={user} minLength={10} maxLength={14} required></input>

            <label>Contraseña: <span>{error}</span></label>
            <input type="text"  onChange={handlePswChange} value={psw} minLength={10} maxLength={14} required 
            style={{ borderColor: error == " " ? "blue" : "red" }}
            ></input>
           
            <button type="submit" disabled={error == " " ? false : true} >Enviar</button>
        </form>
        </div>
    );

}

export default LoginForm;