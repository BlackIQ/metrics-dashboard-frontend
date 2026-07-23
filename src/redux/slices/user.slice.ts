import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_confirmed: boolean;
  is_active: boolean;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
