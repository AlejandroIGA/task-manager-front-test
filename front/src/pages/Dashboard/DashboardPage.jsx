import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import CardComponent from "../../components/cardComponent";
import './style.css'
import TaskGroup from "../../components/taskGroup";
import AuthGuard from "../../components/authGuard/AuthGuard";

const DashboardPage = () => {
    const [groupedTasks, setGroupedTasks] = useState({}); // Objeto para agrupar tareas por status
    const sectionOrder = ["En progreso", "En revisión", "En pausa", "Terminada"];

    let user = localStorage.getItem("user")

    const API_URL = import.meta.env.VITE_API_URL;


    const fetchTasks = async () => {
        try {
            const response = await fetch(`${API_URL}/tasks/all/${user}`);
            const data = await response.json();
            groupTasksByStatus(data.tasks); // Agrupar tareas por status
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Función para agrupar tareas por status
    const groupTasksByStatus = (tasks) => {
        const grouped = tasks.reduce((acc, task) => {
            const status = task.status || "Sin estado"; // Si no hay status, se agrupa como "Sin estado"
            if (!acc[status]) {
                acc[status] = []; // Crear un array vacío para el status si no existe
            }
            acc[status].push(task); // Agregar la tarea al array correspondiente
            return acc;
        }, {});
        setGroupedTasks(grouped); // Actualizar el estado con las tareas agrupadas
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <AuthGuard>
            <MainLayout
                title={"Tablero"}
                rightContent={
                    <CardComponent
                        content={
                            <div className="kanban-board">
                                {sectionOrder.map((status) => {
                                    if (groupedTasks[status]) { // Verificar si hay tareas para este estado
                                        return (
                                            <div key={status} className="kanban-column">
                                                <TaskGroup
                                                    key={status} // Usar el status como clave
                                                    status={status}
                                                    tasks={groupedTasks[status]}
                                                    onEdit={()=>fetchTasks()}
                                                />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        }
                    />
                }
            />
        </AuthGuard>
    );
};

export default DashboardPage;