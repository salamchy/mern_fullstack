import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("user");
    // console.log("setUser called with:", action.payload);

    if (serializedState == null)
      return {
        user: null,
      };
    return { user: JSON.parse(serializedState) };
  } catch (error) {
    return { user: null };
  }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("setUser called with:", action.payload);
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    logOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
