import { configureStore, createSlice } from '@reduxjs/toolkit';

// Auth 리듀서와 액션 생성자 정의
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});
// login action
export const setLoggedIn = (isLoggedIn) => {
  return {
    type: 'SET_LOGGED_IN',
    payload: isLoggedIn,
  };
};
// 액션 생성자를 외부로 내보냄
export const { setTokens, clearTokens } = authSlice.actions;

// 스토어 생성 및 리듀서 등록
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;