import React from "react";
import { EditFilled, DeleteFilled  } from '@ant-design/icons';
import './style.css'

function GroupCard({ name, onEdit, onDelete }) {

    return (
        <div  className="taskCard">
            <div  className="left">
            <h3>Grupo: {name}</h3>
            </div>
            <div className="right">
                <button onClick={onEdit} style={{backgroundColor:"#f2f2f2"}}><EditFilled style={{ color: "#048be9", fontSize: "25px" }}/></button>
                <button onClick={onDelete} style={{backgroundColor:"#f2f2f2"}}><DeleteFilled style={{ color: "#ec1515", fontSize: "25px" }}/></button>
            </div>
            
        </div>
    );
}

export default GroupCard;