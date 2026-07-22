import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  token: string | null;
}

const initialState: SessionState = {
  token: null,
};

const sessionSlice = createSlice({
  name: "session",

  initialState,

  reducers: {
    setSession: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    clearSession: (state) => {
      state.token = null;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
