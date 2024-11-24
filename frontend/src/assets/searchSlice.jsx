import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: "",
        tag: ""
    },
    reducers: {
        setQuery: (state, newQuery) => {
            state.query = newQuery.payload
        },
        setTag: (state, newTag) => {
            state.tag = newTag.payload
        }
    }
})

export const {setQuery, setTag} = searchSlice.actions;

export default searchSlice.reducer;