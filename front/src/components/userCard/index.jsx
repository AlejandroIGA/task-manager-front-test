import React from "react";
import { EditFilled, DeleteFilled  } from '@ant-design/icons';
import './style.css'

function UserCard({ name, rol, onEdit, onDelete, view }) {

    return (
        <div  className="taskCard">
            <div className="left">
            <h3>Usuario: {name}</h3>
            <p>Rol: {rol}</p>
            </div>
            <div  className="right">
                {
                    view == "asignación" ? 
                    <></>
                    :
                    <button onClick={onEdit} style={{backgroundColor:"#f2f2f2"}}><EditFilled style={{ color: "#048be9", fontSize: "25px" }}/></button>
                }
                <button onClick={onDelete} style={{backgroundColor:"#f2f2f2"}}><DeleteFilled style={{ color: "#ec1515", fontSize: "25px" }}/></button>
            </div>
            
        </div>
    );
}

export default UserCard;