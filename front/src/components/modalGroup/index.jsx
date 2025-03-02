import React from "react";
import { useState, useEffect } from 'react'
import { Button, Modal } from 'antd';
import './style.css'

const ModalGroup = ({ isModalOpen, setIsModalOpen, onSubmit, groupToEdit, setGroupToEdit }) => {
    let user = localStorage.getItem("user")
    let createdBy = user;

    const [name, setName] = useState('');


    useEffect(() => {
        if (groupToEdit) {
            setName(groupToEdit.name || '');
        }
    }, [groupToEdit]);


    const handleOk = () => {
        setIsModalOpen(false);
        setGroupToEdit(null);
        setName('');
        onSubmit({ name, createdBy });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setName('');
        setGroupToEdit(null);
    };

    function handleName(e) {
        setName(e.target.value);
    }

    return (
        <>
            <div className="floating-button">
            </div>
            <Modal title={groupToEdit != null ? "Editar un grupo" : "Agregar un grupo"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancelar</Button>,
                    <Button key="submit" onClick={handleOk}>
                        {groupToEdit ? "Actualizar" : "Crear"}
                    </Button>,
                ]}
            >
                <form>
                    <label>Nombre del grupo</label>
                    <input type="text" onChange={handleName} value={name} required minLength={3} maxLength={20}></input>
                </form>
            </Modal>
        </>
    );
};
export default ModalGroup;