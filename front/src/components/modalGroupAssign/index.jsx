import React from "react";
import { useState, useEffect } from 'react'
import { Button, Modal } from 'antd';
import './style.css'

const ModalGroupAssign = ({ isModalOpen, setIsModalOpen, onSubmit, groupToEdit, setGroupToEdit, group }) => {

    const [users, setUsers] = useState([]); //todos los usuarios que no pertenezcan al grupo
    const [assignedUser, setAssignedUser] = useState('');
    const [msg, setMsg] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    function hangdleAssignedUser(e){
        setAssignedUser(e.target.value);
        setMsg("");
    }


    const fetchNoMembers = async () => {
        try {
            const response = await fetch(`${API_URL}/nomembers/${group}`);
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            fetchNoMembers();
        }
    }, [isModalOpen]);


    const handleOk = () => {
        if(assignedUser == ""){
            setMsg("Debe seleccionar un usuario");
            return false;
        }
        onSubmit({ assignedUser });
        setIsModalOpen(false);
        setAssignedUser('');
        setMsg("")
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setAssignedUser('');
    };



    return (
        <>
            <div className="floating-button">
            </div>
            <Modal title="Agregar un usuario" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancelar</Button>,
                ]}
            >
                <form>
                    <label>Usuario</label>
                    <p>{msg}</p>
                    <select
                        value={assignedUser}
                        onChange={hangdleAssignedUser}
                        required
                    >
                        <option value="">Seleccione un usuario</option>
                        {
                            users.map((user) => (
                                <option key={user.id} value={user.id}>{user.user}</option>
                            ))
                        }
                    </select>
                    <Button key="submit" onClick={handleOk} disabled={msg != "" ? true : false}>
                        Agregar
                    </Button>
                </form>
            </Modal>
        </>
    );
};
export default ModalGroupAssign;