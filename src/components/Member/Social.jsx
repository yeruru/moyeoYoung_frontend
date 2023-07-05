import React from 'react';
import KakaoLogin from 'react-kakao-login';
import { KAKAO_AUTH_URL } from './KakaoAuth';


const Social = () => {

    const responseKakao = (response) => {
        // 로그인 성공 시 처리할 로직을 작성합니다.
        // response에는 액세스 토큰과 사용자 정보가 들어 있습니다.
        console.log(response);
      };
    
      const responseFail = (error) => {
        // 로그인 실패 시 처리할 로직을 작성합니다.
        console.error(error);
      };
    
      const responseLogout = () => {
        // 로그아웃 시 처리할 로직을 작성합니다.
        console.info('로그아웃되었습니다.');
      };
    return (
        <div style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
            <form className='social-form'>
            <KakaoLogin  href={KAKAO_AUTH_URL}
                token=""
                onSuccess={responseKakao}
                onFail={console.error}
                onLogout={console.info}
            />
            </form>
        </div>
    );
}
export default Social;
