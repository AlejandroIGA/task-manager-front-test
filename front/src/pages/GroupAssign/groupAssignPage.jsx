import React, { useState, useEffect } from "react";
import { Button} from 'antd';
import MainLayout from "../../layout/MainLayout";
import CardComponent from "../../components/cardComponent";
import './style.css'
import UserCard from "../../components/userCard";
import ModalGroupAssign from "../../components/modalGroupAssign";
import AuthGuard from "../../components/authGuard/AuthGuard";


const GroupAssignPage = () => {
    const [groups, setGroups] = useState([]); 
    const [group, setGroup] = useState('');
    const [members, setMembers] = useState([]); //todos los usuarios que pertenecen al grupo

    const [message, setMessage] = useState(''); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    let user = localStorage.getItem("user")

    const fetchGroups = async () => { //alimentar dropdown
        try {
            const response = await fetch(`${API_URL}/groups/${user}`);
            const data = await response.json();
            setGroups(data.groups);
            setMessage(data.msg)
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error al conectar con el servidor");
        }
    };

    const fetchMembers = async (group) => { 
        try {
            const response = await fetch(`${API_URL}/members/${group}`);
            const data = await response.json();
            setMembers(data.users);
            setMessage(data.msg)
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error al conectar con el servidor");
        }
    };


    const handleOpenModal = () =>{
        setIsModalOpen(true); 
    }

    const handleSubmit = async (data) =>{
        fetch(`${API_URL}/members`, {
            method: 'PUT',
            mode: "cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                user: data.assignedUser, //id del usuario seleccionado
                group: group,
            })
        }).then(
            fetchMembers(group)
        )
    }

    const handleDelete= async(user,group) => {
        fetch(`${API_URL}/members`, {
            method: 'DELETE',
            mode: "cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                user: user, //id del usuario seleccionado
                group: group,
            })
        }).then(
            fetchMembers(group)
        )
    }

    function handleGroup(e){
        const selectedGroup = e.target.value;
        setGroup(selectedGroup);
        if (selectedGroup) {
            fetchMembers(selectedGroup); // Obtener miembros del grupo seleccionado
        } else {
            setMembers([]); // Limpiar la lista de miembros si no se selecciona un grupo
            setMessage("Seleccione un grupo");
        }
    }

    useEffect(() => {
        fetchGroups();
    }, []);

    return (
        <AuthGuard>
            <MainLayout
                title = {"Asignación de grupos"}                
                rightContent={
                    <CardComponent
                    action={<Button onClick={() => handleOpenModal()} className="floating-button" disabled={group ? false: true}>Añadir usuario</Button>}
                    content={
                        <>
                            <select
                                onChange = {handleGroup}
                                value = {group}
                            >
                                <option value="">Seleccione un grupo</option>
                                {
                                    groups.map((group)=>(
                                        <option key={group.id} value={group.name}>{group.name}</option>
                                    ))
                                }
                            </select>
                            {
                                members.length == 0 ? 
                                <p>{message}</p>
                                :
                                members.map((member)=>(
                                    <UserCard
                                        name={member.user}
                                        rol = {member.rol}
                                        view = {"asignación"}
                                        onDelete={()=>handleDelete(member.id, group)}
                                    />
                                ))
                            }
                        </>
                    }
                    />
                }
            />
            <ModalGroupAssign
                isModalOpen = {isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onSubmit = {handleSubmit}
                group={group}
            />
        </AuthGuard>
    );
};

export default GroupAssignPage;