const CLIENT_ID = '7d6310079aefcc1ca0a033d98a5b3e9as';
const REDIRECT_URI =
  '	https://localhost:3000/login/oauth2/code/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri= ${REDIRECT_URI}&response_type=code`;
