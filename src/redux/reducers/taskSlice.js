import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTasks = createAsyncThunk(
  'task/getTasks',
  async (someData, {rejectWithValue}) => {
    try {
      const res = await axios.get('https://64274fa0161067a83bf966b2.mockapi.io/tasks');
      return res.data

    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const deleteTask = createAsyncThunk(
     'task/deleteTasks',
  async (id, thunkAPI) => {
     try {
       const res = await axios.delete(`https://64274fa0161067a83bf966b2.mockapi.io/tasks/${id}`);
       thunkAPI.dispatch(getTasks());
       return res.data;

       } catch (err) {

       }
   }
)

export const createTask = createAsyncThunk(
  'task/createTasks',
  async (newTask, thunkAPI) => {
    try {
      const res = await axios.post('https://64274fa0161067a83bf966b2.mockapi.io/tasks', newTask);
      thunkAPI.dispatch(getTasks());
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
)

export const changeIsDone = createAsyncThunk(
  'task/changeIsDone',
  async (task, thunkAPI) => {
    try {
      const res = await axios.put(`https://64274fa0161067a83bf966b2.mockapi.io/tasks/${task.id}`, task);
      thunkAPI.dispatch(getTasks());
      return res.data;
    } catch (err) {
      console.log(err)
    }
  }
)

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    searchedTasks: [],
    isSearching: false,
    isLoading: false,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    removeTask: (state, action) => {
      state.tasks.splice(state.tasks.findIndex(task => task.id === action.payload), 1);
    },

    changeStatus: (state, action) => {
      state.tasks = state.tasks.map(task => task.id === action.payload ? {...task, isDone: !task.isDone} : task);
    },

    searchTask: (state, action) => {
      state.searchedTasks = state.tasks.filter(task => task.text.includes(action.payload));
    },

    setSavedTasks: (state, action) => {
      state.tasks = action.payload
    },

    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    })
    builder.addCase(getTasks.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error.message);
    })

    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = false;
    })

    builder.addCase(createTask.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(createTask.rejected, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(changeIsDone.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(changeIsDone.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(changeIsDone.rejected, (state, action) => {
      state.isLoading = false;
    })
  },
});

// Action creators are generated for each case reducer function
export const { addTask, searchTask, setSavedTasks, setIsSearching} = taskSlice.actions;

export default taskSlice.reducer
