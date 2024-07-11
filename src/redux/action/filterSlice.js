import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        filter: { price: "", categories: "", isOpen: false}
    },
    reducers: {
        setFilter(state, action) {
            state.filter = action.payload;
        },
        removeFilter(state) {
            state.filter = { price: "", categories: "", isOpen: false};
        }
    }
})

export const { setFilter, removeFilter } = filterSlice.actions;
export default filterSlice.reducer;