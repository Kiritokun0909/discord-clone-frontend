import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  username: string | null;
  email: string | null;
  avatarUrl: string | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  avatarUrl: null,
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<UserState, 'isLoggedIn'>>) => {
      return { ...action.payload, isLoggedIn: true };
    },
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      return { ...state, ...action.payload };
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, setTokens, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;