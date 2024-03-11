import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

import { builderFullfilledFetchOneTask, builderFullfilledFetchTasks, builderPendingFetchOneTask, builderPendingFetchTasks, builderRejectedFetchOneTask, builderRejectedFetchTasks } from "./todobuilderFunctions";
import { GetAllTasksURL, GetOneTaskURL } from "../../BackendServerLinks";

export const fetchAllTasks = createAsyncThunk("todo/fetchAllTasks", async () => {
    const data = await axios.get(GetAllTasksURL, {withCredentials:true});
    return data.data.tasks;
})

export const fetchOneTask = createAsyncThunk("todo/fetchOneTasks", async (id) => {
    const data = await axios.get(`${GetOneTaskURL}/${id}`, {withCredentials:true});
    return data.data.task;

})


const initialState = {
    isLoading : false,
    data: [],
    dataC: [],
    currentTodoPage:{},
    isError: null
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers:{
        addTask : (state, action) => {
            const todoObj = {
                _id : action.payload._id,
                title : action.payload.title,
                description : action.payload.description,
                priority : action.payload.priority,
                status : action.payload.status
            }
            state.data.push(todoObj)
            state.dataC.push(todoObj)
        },
        addTaskStateUpdateViaFilter : (state,action) => {
            state.data = action.payload.data
            state.dataC = action.payload.data
        },

        removeTask : (state,action) => {
            state.data = state.data.filter(todoItem => (todoItem._id !== action.payload._id))
            state.dataC = state.dataC.filter(todoItem => (todoItem._id !== action.payload._id))
        },

        filterTasksOnTitle : (state, action) => {
            state.data = state.dataC;
            state.data = state.data.filter(todoItem => (todoItem.title.toLowerCase().includes(action.payload.title.toLowerCase())))
        },
        AddDataCurrentTodoPage : (state, action) => {
            state.currentTodoPage = {...action.payload}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllTasks.pending, builderPendingFetchTasks),
        builder.addCase(fetchAllTasks.fulfilled, builderFullfilledFetchTasks),
        builder.addCase(fetchAllTasks.rejected, builderRejectedFetchTasks)
        builder.addCase(fetchOneTask.pending, builderPendingFetchOneTask)
        builder.addCase(fetchOneTask.fulfilled, builderFullfilledFetchOneTask)
        builder.addCase(fetchOneTask.rejected, builderRejectedFetchOneTask)
    }
})

export const {addTask,addTaskStateUpdateViaFilter, removeTask, filterTasksOnTitle, AddDataCurrentTodoPage} = todoSlice.actions
export default todoSlice.reducer