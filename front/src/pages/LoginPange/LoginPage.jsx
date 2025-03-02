import React from "react";
import LoginForm from "../../components/loginForm";
import Nav from "../../components/nav/nav";
import './loginPage.css';

const LoginPage = () =>{
    return(
        <>
        <Nav/>
        <div className="login-page-container">
            <LoginForm></LoginForm>
        </div>
        </>
    )
}

export default LoginPage;