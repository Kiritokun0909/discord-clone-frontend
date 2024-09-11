import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  username: string | null;
  email: string | null;
  avatarUrl: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  avatarUrl: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<UserState, 'isLoggedIn'>>) => {
      return { ...action.payload, isLoggedIn: true };
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;