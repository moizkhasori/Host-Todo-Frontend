import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./User/userSlice";
import todoReducer from "./Todo/todoSlice";

const store = configureStore({
    reducer:{
        user: userReducer,
        todo: todoReducer,
    }
})

export default store;