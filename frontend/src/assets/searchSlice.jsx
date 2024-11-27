import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: "",
        tag: "",
        tagName: ""
    },
    reducers: {
        setQuery: (state, newQuery) => {
            state.query = newQuery.payload
        },
        setTag: (state, newTag) => {
            state.tag = newTag.payload
        },
        setTagName: (state, newTagName) => {
            state.tagName = newTagName.payload
        }
    }
})

export const {setQuery, setTag, setTagName} = searchSlice.actions;

export default searchSlice.reducer;