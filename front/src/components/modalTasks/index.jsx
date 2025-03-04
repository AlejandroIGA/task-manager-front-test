import React from "react";
import { useState, useEffect } from 'react'
import { Button, Modal, Form, Input, DatePicker, Select, message } from 'antd';
import moment from 'moment';
import './style.css'

const ModalTasks = ({ isModalOpen, setIsModalOpen, onSubmit, taskToEdit, setTaskToEdit, view }) => {

    const [form] = Form.useForm();

    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);

    const [user, setUser] = useState(localStorage.getItem("user"))

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchUsers = async (group) => {
        try {
            const response = await fetch(`${API_URL}/members/${group}`);
            const data = await response.json();
            setUsers(data.users)
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchGroups = async () => {
        try {
            const response = await fetch(`${API_URL}/groups/${user}`);
            const data = await response.json();
            setGroups(data.groups)
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handleOk = (values) => {
        setIsModalOpen(false);
        setTaskToEdit(null);
        console.log(form.getFieldValue("assignedUser"))
        onSubmit(values);
        form.resetFields();
        form.setFieldsValue(
            {
                status: "En progreso",
                category: "Baja",
                group: "Sin grupo",
                assignedUser: "Sin asignar"
            })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setTaskToEdit(null);
        form.resetFields();
        form.setFieldsValue(
            {
                status: "En progreso",
                category: "Baja",
                group: "Sin grupo",
                assignedUser: "Sin asignar"
            })
    };

    useEffect(() => {
        if (taskToEdit) {
            const formattedDate = moment(taskToEdit.date._seconds * 1000); 
            form.setFieldsValue({
                name: taskToEdit.name,
                description: taskToEdit.description,
                id: taskToEdit.id,
                date: formattedDate,
                assignedUser: taskToEdit.assignedUser,
                status: taskToEdit.status,
                category: taskToEdit.category,
                group: taskToEdit.group,
                user: taskToEdit.user
            })
            console.log(form.getFieldValue("group"))
            fetchUsers(taskToEdit.group);
            fetchGroups();
        } else {
            form.setFieldsValue(
                {
                    status: "En progreso",
                    category: "Baja",
                    group: "Sin grupo",
                    assignedUser: "Sin asignar"
                })
            fetchGroups();
        }
    }, [taskToEdit]);

    return (
        <>
            <Modal title={taskToEdit != null ? "Editar una tarea" : "Agregar una tarea"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[

                ]}
            >
                <Form onFinish={handleOk} form={form}>
                    <Form.Item name = "id" hidden="true"></Form.Item>
                    <Form.Item
                        label="Nombre de la tarea"
                        name="name"
                        rules={[
                            { required: true, message: "Ingresa un nombre" },
                            { min: 3, message: "Longitud minima de 3 caracteres" },
                            { max: 20, message: "Longitud máxima de 20 caracteres" }
                        ]}
                    >
                        <Input disabled={view == "tablero" ? true : false} />
                    </Form.Item>
                    <Form.Item
                        label="Descripción"
                        name="description"
                        rules={[
                            { required: true, message: "Ingrese una descripción" },
                            { min: 3, message: "Longitud minima de 3 caracteres" },
                            { max: 100, message: "Longitud máxima de 100 caracteres" }
                        ]}
                    >
                        <Input disabled={view == "tablero" ? true : false} />
                    </Form.Item>
                    <Form.Item
                        label="Fecha limite"
                        name="date"
                        rule={[
                            { required: true, message: "Ingrese una fecha limite" }
                        ]}
                    >
                        <DatePicker disabled={view == "tablero" ? true : false} placeholder="" />
                    </Form.Item>

                    <Form.Item
                        label="Estatus"
                        name="status"
                    >
                        <Select disabled={form.getFieldValue("assignedUser") != localStorage.getItem('user') && view == "asignación" ? true : false}>
                            <Select.Option value="En progreso">En progreso</Select.Option>
                            <Select.Option value="Terminada">Terminada</Select.Option>
                            <Select.Option value="En pausa">En pausa</Select.Option>
                            <Select.Option value="En revisión">En revisión</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Categoría"
                        name="category"
                    >
                        <Select disabled={view == "tablero" ? true : false}>
                            <Select.Option value="Baja"></Select.Option>
                            <Select.Option value="Media"></Select.Option>
                            <Select.Option value="Alta"></Select.Option>
                        </Select>
                    </Form.Item>

                    {
                        view == "asignación"?
                            <>
                            <Form.Item
                                name = "group"
                                hidden = "true"
                            >
                                <Select>
                                    <Select.Option key={999} value={form.getFieldValue("group")}>{form.getFieldValue("group")}</Select.Option>
                                </Select>
                            </Form.Item>
                            
                            </>
                            :
                            <>
                                <Form.Item
                                    label="Grupo"
                                    name="group"
                                >
                                    <Select
                                        disabled = {view == "tablero" ? true : false}
                                    >
                                        <Select.Option value="Sin grupo">Sin grupo</Select.Option>
                                        {
                                            view == "tablero" ?
                                                <Select.Option value={form.getFieldValue("group")}>{form.getFieldValue("group")}</Select.Option>
                                                :
                                                groups.map((group) => (
                                                    <Select.Option key={group.id} value={group.name}>{group.name}</Select.Option>
                                                ))
                                        }
                                    </Select>
                                </Form.Item>
                            </>
                    }
                    {
                        view == "Tareas" ?
                            <>
                            <Form.Item
                                label = "Usario"
                                name = "assignedUser"
                                hidden = "true"
                            >
                                <Select>
                                    <Select.Option value="Sin asignar">Sin asignar</Select.Option>
                                </Select>
                            </Form.Item>
                            </>
                            :
                            <>
                                <Form.Item
                                    label="Usuario"
                                    name="assignedUser"
                                >
                                    <Select
                                        disabled = {view == "tablero" ? true : false}
                                    >
                                        <Select.Option value="Sin asignar">Sin asignar</Select.Option>
                                        {
                                            users.map((user) => (
                                                <Select.Option key={user.id} value={user.user}>{user.user}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </>
                    }
                    <Form.Item label={null}>
                        <Button htmlType="submit">
                            {taskToEdit ? "Actualizar" : "Crear"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default ModalTasks;