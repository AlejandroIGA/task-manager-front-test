import React from "react";
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import './styles.css'

function TaskCard({ name, status, onEdit, onDelete, group, assignedUser, description, view, user }) {

    return (
        <div className="taskCard">
            <div className="left">
                <h3>Tarea: {name}</h3>
                <p>Esatus: {status}</p>
                <p>Grupo: {group}</p>
                <p>Responsable: {user == localStorage.getItem('user') && group == "Sin asignar" ? localStorage.getItem('user') : assignedUser}</p>
                <p>Descripción: {description}</p>
            </div>
            <div className="righr">
                {
                    view == "tablero" && assignedUser == localStorage.getItem('user') ?
                        <>
                            <button onClick={onEdit} style={{ backgroundColor: "#f2f2f2" }}  disabled={status=="Terminada" ? true:false}><EditFilled style={{ color: "#048be9", fontSize: "25px" }} /></button>

                        </>
                        :
                    view == "tablero"? 
                    <></>
                    :
                        <>
                            <button onClick={onEdit} style={{ backgroundColor: "#f2f2f2" }}><EditFilled style={{ color: "#048be9", fontSize: "25px" }} /></button>
                            <button onClick={onDelete} style={{ backgroundColor: "#f2f2f2" }}><DeleteFilled style={{ color: "#ec1515", fontSize: "25px" }} /></button>
                        </>
                }
            </div>
        </div>
    );
}

export default TaskCard;