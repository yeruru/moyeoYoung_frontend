const CLIENT_ID = '7d6310079aefcc1ca0a033d98a5b3e9a';
const REDIRECT_URI =
process.env.REACT_APP_FURL+'/login/oauth2/code/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri= ${REDIRECT_URI}&response_type=code`;
// export const KAKAO_AUTH_URL='https://kauth.kakao.com/oauth/authorize?client_id=14280bfb40e2629dc20972a0c8134358&redirect_uri=http://localhost:8090/login/oauth2/code/kakao&response_type=code';