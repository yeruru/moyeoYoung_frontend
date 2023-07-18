import React from 'react';
import { KAKAO_AUTH_URL } from './KakaoAuth';


const Social = () => {

    return (
        <div style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
            <form className='social-form'>
            <a href={KAKAO_AUTH_URL}>카카오요청</a>
            </form>
        </div>
    );
}
export default Social;
