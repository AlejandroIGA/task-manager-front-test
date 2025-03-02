import React from "react";
import { useState } from 'react'
import './style.css'

function RegisterForm() {

    const [user, setUser] = useState("");
    const [psw, setPsw] = useState("");
    const [email, setEmail] = useState("");


    const [error, setError] = useState("");
    const [errorNombre, setErrorNombre] = useState("");

    const [mensaje, setMensaje] = useState("");
    const [mostrar, setMostrar] = useState(false);

    function handleUserChange(e) {
        let val = e.target.value
        val = val.trim()
        if (val != null) {
            setUser(val)
        }
    }

    function handleEmailChange(e){
        let val = e.target.value
        val = val.trim();
        if (val != null) {
            setEmail(val)
        }
    }


    function handlePswChange(e) {
        let val = e.target.value
        val = val.trim();
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

        fetch("http://127.0.0.1:3000/register",{
                method: 'POST',
                mode: "cors", 
                headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    user: user.trim(),
                    psw: psw,
                    email: email,
                    rol: "worker"
                })
            }).then(response => response.json())
            .then(data => {
                setMensaje(data.msg);
                setMostrar(true);
            });
    };

    return (
        <div>
        <h2 style={{color:"black"}}>Registrarse</h2>
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

            <label>Correo: </label>
            <input type="email"  onChange={handleEmailChange} value={email} minLength={10} maxLength={80}  required></input>
            <button type="submit" disabled={error == " " || errorNombre == " "? false : true} >Enviar</button>
        </form>
        </div>
    );

}

export default RegisterForm;