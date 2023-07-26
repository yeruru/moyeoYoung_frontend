import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    accessToken: null,
    refreshToken: null,
    accessTokenExpiresIn: null,
  },
  reducers: {
    setTokens: (state, action) => {
      const { accessToken, refreshToken, accessTokenExpiresIn } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.accessTokenExpiresIn = accessTokenExpiresIn;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.accessTokenExpiresIn = null;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setTokens, clearTokens, setLoggedIn } = authSlice.actions;
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
