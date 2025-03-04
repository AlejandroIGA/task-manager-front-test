import React from "react";
import { useState } from 'react'
//import './style.css'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';


function LoginForm() {

    const [mensaje, setMensaje] = useState("");
    const [mostrar, setMostrar] = useState(false);

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const [form] = Form.useForm();


    const handleSubmit = async (values) => {
        fetch(`${API_URL}/login`, {
            method: 'GET',
            mode: "cors",
            headers: {
                'user': values.user,
                'psw': values.psw
            },
        }).then(response => response.json())
            .then(data => {
                setMensaje(data.msg);
                setMostrar(true);
                if (data.msg == "Credenciales correctas") {
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
            <Form onFinish={handleSubmit} form={form}>
                {
                    mostrar == true ? <p>{mensaje}</p> : <></>
                }
                <Form.Item
                    label="Usuario"
                    name="user"
                    rules={[
                        { required: true, message: 'Ingrese un nombre de usuario' },
                        { min: 10, message: "Debe tener una longitud minima de 10 caracteres" },
                        { max: 14, message: "Debe tener una longitud máxima de 14 caracteres" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Contraseña"
                    name="psw"
                    rules={[
                        { required: true, message: 'Ingrese su contraseña' },
                        { min: 10, message: "Debe tener una longitud minima de 10 caracteres" },
                        { max: 14, message: "Debe tener una longitud máxima de 14 caracteres" },
                        {
                            pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                            message: 'La contraseña debe contener al menos una letra y un número',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item label={null}>
                    <Button htmlType="submit">
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );

}

export default LoginForm;