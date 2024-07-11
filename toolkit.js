import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

const setFilter = createAction("SET_FILTER");
const removeFilter = createAction("REMOVE_FILTER");

const filterReducer = createReducer(
    { filter: [] },
    (builder) => {
        builder
            .addCase(setFilter, (state, action) => {
                state.filter = action.payload;
            })
            .addCase(removeFilter, (state) => {
                state.filter = { price: "", categories: "", isOpen: false};
            });
    }
)

const store = configureStore({
    reducer: filterReducer
})

// export { setFilter, removeFilter, store };

