import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: "",
        tag: "HERBATA",
        tagName: "HERBATY",
        sort: 1,
        catOpen: ""
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
        },
        setSort: (state, newSort) => {
            state.sort = newSort.payload
        },
        setCatOpen: (state, newCatOpen) => {
            state.catOpen = newCatOpen.payload
        },
    }
})

export const {setQuery, setTag, setTagName, setSort, setCatOpen} = searchSlice.actions;

export default searchSlice.reducer;