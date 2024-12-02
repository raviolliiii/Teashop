import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        valid: false,
        user: null
    },
    reducers: {
        setValid: (state, newValid) => {
            state.valid = newValid.payload;
        },
        setUser: (state, newUser) => {
            state.user = newUser.payload;
        },
        logOut: (state) => {
            state.valid = false;
            state.user = null;
        },
        setLogin: (state, newLogin) => {
            state.valid = newLogin.payload.valid;
            state.user = newLogin.payload.user;
        }
    }
})

export const {setValid, setUser, logOut, setLogin} = loginSlice.actions;

export default loginSlice.reducer;