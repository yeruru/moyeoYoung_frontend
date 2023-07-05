import React from 'react';
import LoginForm from '../../components/Member/LoginForm';
import Social from '../../components/Member/Social';
    
const Login = () => {
    return (
        <div className='wrap'>
            <p>로그인페이지</p>
            <LoginForm/>
            <Social/>
        </div>
    );
};

export default Login;