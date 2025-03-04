import React from "react";
import { useState } from 'react'
import { Button, Form, Input } from 'antd';
//import './style.css'

function RegisterForm() {

    const [form] = Form.useForm();

    const [mensaje, setMensaje] = useState("");
    const [mostrar, setMostrar] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (values) => {

        fetch(`${API_URL}/register`, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                user: values.user,
                psw: values.psw,
                email: values.email,
                rol: "Trabajador"
            })
        }).then(response => response.json())
            .then(data => {
                setMensaje(data.msg);
                setMostrar(true);
            });
    };

    return (
        <div>
            <h2 style={{ color: "black" }}>Registrarse</h2>
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
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Correo"
                    name="email"
                    rules={[
                        { type: 'email', message: "Ingrese un correo válido" },
                        { required: true, message: "Ingrese su correo" }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item label={null}>
                    <Button htmlType="submit">
                        Registrarse
                    </Button>
                </Form.Item>            
            </Form>
        </div>
    );

}

export default RegisterForm;