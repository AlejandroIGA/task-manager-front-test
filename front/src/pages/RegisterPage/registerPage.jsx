import React from "react";
import RegisterForm from "../../components/registerForm";
import Nav from "../../components/nav/nav";
import './registerPage.css';

const RegisterPage = () =>{
    return(
        <>
        <Nav/>
        <div className="register-page-container">
            <RegisterForm></RegisterForm>
        </div>
        </>
    )
}

export default RegisterPage;