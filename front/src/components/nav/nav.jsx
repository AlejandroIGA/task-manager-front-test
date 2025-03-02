import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './nav.css';

const { Header } = Layout;

function Nav() {
    const [current, setCurrent] = useState("");
    const location = useLocation();

    const tabNames = ["Servicios", "Certificaciones", "Ingresar","Registrarse"];
    const items = tabNames.map((tabName, index) => ({
        key: (index + 1).toString(),
        label: tabName,
        url: `/${tabName.toLowerCase()}`
    }));

    useEffect(() => {
        // Sincroniza el estado 'current' con la ruta actual
        const currentItem = items.find(item => item.url === location.pathname);
        if (currentItem) {
            setCurrent(currentItem.key);
        } else {
            setCurrent(""); // Resetear si no se encuentra ninguna coincidencia
        }
    }, [location.pathname, items]);

    return (
        <Layout>
            <Header className='header-content'>
                <div>
                    <Link to="/">
                        <h2 style={{color:"white"}}>Logo</h2>
                    </Link>
                </div>
                <div>
                    <Menu 
                        mode='horizontal' 
                        selectedKeys={[current]} 
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            flex: 1,
                            marginRight: '20px', 
                            backgroundColor: "#394159",
                            minWidth: '500px'
                        }}
                    >
                        {items.map(item => (
                            <Menu.Item key={item.key} onClick={() => setCurrent(item.key)}>
                                <Link to={item.url} style={{ color: '#fff' }}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </div>
            </Header>
        </Layout>
    );
}

export default Nav;