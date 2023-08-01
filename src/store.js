import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './redux/reducers/taskSlice'

export default configureStore({
  reducer: {
    task: tasksReducer,
  },
});
