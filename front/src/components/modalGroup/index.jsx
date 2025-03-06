import React from "react";
import { useState, useEffect } from 'react'
import { Button, Modal } from 'antd';
import './style.css'

const ModalGroup = ({ isModalOpen, setIsModalOpen, onSubmit, groupToEdit, setGroupToEdit }) => {
    let user = localStorage.getItem("user")
    let createdBy = user;

    const [name, setName] = useState('');
    const [msg, setMsg] = useState("");


    useEffect(() => {
        if (groupToEdit) {
            setName(groupToEdit.name || '');
        }
    }, [groupToEdit]);


    const handleOk = () => {
        if(name.trim() == ""){
            setMsg("Debe de ingresar un nombre");
            return false;
        }
        onSubmit({ name, createdBy });
        setIsModalOpen(false);
        setGroupToEdit(null);
        setName('');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setName('');
        setGroupToEdit(null);
    };

    function handleName(e) {
        setName(e.target.value);
        setMsg("");
    }

    return (
        <>
            <div className="floating-button">
            </div>
            <Modal title={groupToEdit != null ? "Editar un grupo" : "Agregar un grupo"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancelar</Button>,
                ]}
            >
                <form>
                    <label>Nombre del grupo</label>
                    <p>{msg}</p>
                    <input type="text" onChange={handleName} value={name} required minLength={3} maxLength={20}></input>
                </form>
                <Button key="submit" onClick={handleOk}>
                        {groupToEdit ? "Actualizar" : "Crear"}
                </Button>
            </Modal>
        </>
    );
};
export default ModalGroup;