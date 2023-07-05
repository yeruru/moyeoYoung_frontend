import React from 'react';
import LoginForm from '../../components/Member/LoginForm';
import Social from '../../components/Member/Social';
import './Login.css';
const Login = () => {
    return (
        <div className='Login wrap'>
            <div className='login-component'>
                <LoginForm/>
                <Social/>
            </div>
        </div>
    );
};

export default Login;