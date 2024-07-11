import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./action/filterSlice";

const store = configureStore({
    reducer: {
        filter: filterReducer
    }
})
console.log("ready",store.getState());

store.subscribe(() => {
    console.log(store.getState());
})

export default store;