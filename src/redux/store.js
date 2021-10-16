import todo from "./todo";
import {configureStore} from "@reduxjs/toolkit";

const Store = configureStore({
    reducer: {todo},
});

export default Store;