import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import './style.css'

const MenuComponent = () => {

  const [current, setCurrent] = useState("");
  const location = useLocation();

  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();
  

  const tabNames = ["Tablero", "Usuarios", "Grupos", "Asignación de grupos", "Tareas","Asignación de tareas"];
  const filteredTabNames = (() => {
    if (userRole === "master") {
      return tabNames; // Mostrar todas las opciones
    } else if (userRole == "Trabajador") {
      return tabNames.filter(tab => tab === "Tablero" || tab === "Tareas" ); // Solo Tablero y Tareas
    } else {
      return tabNames.filter(tab => tab !== "Usuarios"); // Excluir "Usuarios" para otros roles
    }
  })();

  const items = filteredTabNames.map((tabName, index) => ({
    key: (index + 1).toString(),
    label: tabName,
    url: `/${tabName.toLowerCase().trim()}`
  }));


  useEffect(() => {
    const role = localStorage.getItem("rol");
    setUserRole(role);

    // Sincroniza el estado 'current' con la ruta actual
    const currentItem = items.find(item => item.url === location.pathname);
    if (currentItem) {
      setCurrent(currentItem.key);
    } else {
      setCurrent(""); // Resetear si no se encuentra ninguna coincidencia
    }
  }, [location.pathname, items]);

  function logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("rol");
    localStorage.removeItem("token");
    navigate("/ingresar");
  }


  return (
    <>
    <Menu
      style={{
        width: "100%",
        height: "100%",
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      selectedKeys={[current]}
    >
      {items.map(item => (
        <Menu.Item key={item.key} onClick={() => setCurrent(item.key)}>
          <Link to={item.url}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
    <button onClick={logout} className='floatting'>Cerrar sesión</button>
    </>
    
  );
};
export default MenuComponent;