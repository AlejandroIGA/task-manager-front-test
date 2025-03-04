import React, { useState, useEffect } from "react";
import TaskCard from '../taskCard';
import ModalTasks from '../modalTasks';

const TaskGroup = ({ status, tasks, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleSubmit = async (data) => {
    fetch(`${API_URL}/tasks/update/${taskToEdit.id}`, {
      method: 'PUT',
      mode: "cors",
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
          user: localStorage.getItem("user"),
          name: data.name,
          description: data.description,
          category: data.category,
          status: data.status,
          date: data.date,
          group: data.group,
          assignedUser: data.assignedUser
      })
  }).then(
      setTaskToEdit(null),
      onEdit()
  )
  }


  return (
    <div className="task-group">
      <h3>{status}</h3> 
      {tasks.map((task) => (
        <TaskCard
          key={task.id} 
          name={task.name}
          status={task.status}
          assignedUser={task.assignedUser}
          description={task.description}
          user={task.user}
          group={task.group}
          view={"tablero"}
          onEdit={() => handleEditTask(task)}
        />
      ))}

      <ModalTasks
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        taskToEdit={taskToEdit}
        setTaskToEdit={setTaskToEdit}
        onSubmit={handleSubmit}
        view={"tablero"}
      />
    </div>


  );
};

export default TaskGroup;