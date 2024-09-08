import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  username: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: null,
  username: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<UserState, 'isLoggedIn'>>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.id = null;
      state.username = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;