import React from 'react';
import { useRoutes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import LoginPage from '../pages/LoginPange/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import RegisterPage from '../pages/RegisterPage/registerPage';
import ModalTasks from '../components/modalTasks';
import TaskCard from '../components/taskCard';
import TasksPage from '../pages/TasksPage/tasksPage';
import GroupPage from '../pages/GroupPage/groupPage';
import UserPage from '../pages/UserPage/userPage';
import GroupAssignPage from '../pages/GroupAssign/groupAssignPage';
import TaskAssignPage from '../pages/TaskAssign/taskAssignPage';



const AppRoutes = () => {
    let routes = useRoutes([
        {path: '/', element:<LandingPage/>},
        {path: '/ingresar', element:<LoginPage></LoginPage>},
        {path: '/tablero', element:<DashboardPage></DashboardPage>},
        {path: '/tareas', element:<TasksPage></TasksPage>},
        {path: '/grupos', element: <GroupPage></GroupPage>},
        {path: '/usuarios', element: <UserPage></UserPage>},
        {path: '/asignación de grupos', element: <GroupAssignPage></GroupAssignPage>},
        {path: '/asignación de tareas', element: <TaskAssignPage></TaskAssignPage>},
        {path: '/registrarse', element: <RegisterPage></RegisterPage>},
        {path: '/modal', element: <ModalTasks></ModalTasks>},
        {path: '/card', element: <TaskCard></TaskCard>}
    ]);
    
    return routes;
}

export default AppRoutes;