import React from "react";
import { useState, useEffect } from 'react'
import { Button, Modal } from 'antd';
import './style.css'

const ModalUser = ({ isModalOpen, setIsModalOpen, onSubmit, userToEdit, setUserToEdit }) => {

    const [user, setUser] = useState("");
    const [psw, setPsw] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState("");

    const [error, setError] = useState(""); 


    useEffect(() => {
        if (userToEdit) {
            setUser(userToEdit.user || '');
            setEmail(userToEdit.email || '');
            setRol(userToEdit.rol || '');
        }
    }, [userToEdit]);


    const handleOk = () => {
        setIsModalOpen(false);
        setUserToEdit(null);
        onSubmit({ user, psw, email, rol });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setUserToEdit(null);

        setUser('');
        setPsw('');
        setEmail('');
        setRol('');
    };

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
        if(userToEdit != null){
            setError(" ")
            return true;
        }
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

    function handleRol(e) {
        setRol(e.target.value)
    }


    return (
        <>
            <div className="floating-button">
            </div>
            <Modal title={userToEdit != null ? "Editar un usuario" : "Agregar un usuario"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancelar</Button>,
                    <Button key="submit" onClick={handleOk}  disabled={userToEdit ? false : error !== " "}>
                        {userToEdit ? "Actualizar" : "Crear"}
                    </Button>,
                ]}
            >
                <form>
                    <label>Usuario: </label>
                    <input type="text" onChange={handleUserChange} value={user} minLength={10} maxLength={14} required></input>

                    <label hidden={userToEdit ? true : false}>Contraseña: <span>{error}</span></label>
                    <input type="text" onChange={handlePswChange} value={psw} minLength={10} maxLength={14} required={userToEdit ? false : true}
                        style={{ borderColor: error == " " ? "blue" : "red" }}
                        hidden={userToEdit ? true : false}
                    ></input>

                    <label>Correo: </label>
                    <input type="email" onChange={handleEmailChange} value={email} minLength={10} maxLength={80} required></input>

                    <label>Rol</label>
                    <select
                        value={rol}
                        onChange={handleRol}
                    >
                        <option value="Administrador">Administrador</option>
                        <option value="Trabajador">Trabajador</option>
                    </select>
                </form>
            </Modal>
        </>
    );
};
export default ModalUser;