import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"


export const getusertasks = createAsyncThunk(
    "task/getusertasks", async(_ , {rejectWithValue}) => {
        try {
            const res = await axios.get("/task/getusertasks", {
                headers: {
                token: localStorage.getItem("token")
            }
        }) 
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
        }
    }
)


export const addtask = createAsyncThunk(
    "task/addtask", async( info , {rejectWithValue, dispatch}) => {
        try {
            const res = await axios.post("/task/newTask", info ,{
                headers: {
                token: localStorage.getItem("token")
            }
        }) 
        dispatch(getusertasks())
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
        }
    }
)


export const deletetask = createAsyncThunk(
    "task/deletetask", async( id , {rejectWithValue, dispatch}) => {
        try {
            const res = await axios.delete(`/task/deletetask/${id}`, {
                headers: {
                token: localStorage.getItem("token")
            }
        }) 
            dispatch(getusertasks())
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
        }
    }
)


export const updatetask = createAsyncThunk(
    "task/updatetask", async( task , {rejectWithValue, dispatch}) => {
        try {
            const res = await axios.put(`/task/updatetask/${task._id}`, task ,  {
                headers: {
                token: localStorage.getItem("token")
            }
        }) 
            dispatch(getusertasks())
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
        }
    }
)


const taskSlice = createSlice({
    name: "task",
    initialState: {
        isLoading: false,
        taskList: [],
        errors: null
    },
    extraReducers: {
        [getusertasks.pending] : (state) => {state.isLoading = true},
        [getusertasks.fulfilled] : (state, action) => {
            state.isLoading = false
            state.errors = null
            state.taskList = action.payload.tasks
        },
        [getusertasks.rejected] : (state, action) => {
            state.isLoading = false
            state.errors = action.error
            state.taskList = []
            state.token = null
        },

        [addtask.pending] : (state) => {state.isLoading = true},
        [addtask.fulfilled] : (state, action) => {
            state.isLoading = false
            state.errors = null
            state.taskList = action.payload.tasks
        },
        [addtask.rejected] : (state, action) => {
            state.isLoading = false
            state.errors = action.error
            state.taskList = []
        },
   
        
        [deletetask.pending] : (state) => {state.isLoading = true},
        [deletetask.fulfilled] : (state, action) => {
            state.isLoading = false
            state.errors = null
            state.taskList = action.payload.tasks
        },
        [deletetask.rejected] : (state, action) => {
            state.isLoading = false
            state.token = null
            state.isAuth = false
            state.errors = action.error
        },
        
        [updatetask.pending] : (state) => {state.isLoading = true},
        [updatetask.fulfilled] : (state, action) => {
            state.isLoading = false
            state.errors = null
            state.taskList = action.payload.tasks
        },
        [updatetask.rejected] : (state, action) => {
            state.isLoading = false
            state.token = null
            state.isAuth = false
            state.errors = action.error
        },
        
}

})

export default taskSlice.reducer