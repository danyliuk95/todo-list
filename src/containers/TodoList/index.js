import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import CustomTextField from '../../components/CustomTextField';
import './styles.scss';
import { CircularProgress } from '@mui/material';
import Task from '../../components/Task';
import { useDispatch, useSelector } from 'react-redux';
import {
  searchTask,
  setIsSearching,
  getTasks, deleteTask, createTask, changeIsDone
} from '../../redux/reducers/taskSlice';

const TodoList = () => {
  const tasksRedux = useSelector((state) => state.task.tasks);
  const searchedTasks = useSelector((state) => state.task.searchedTasks);
  const isSearching = useSelector((state) => state.task.isSearching);
  const isLoading = useSelector((state) => state.task.isLoading)
  const dispatch = useDispatch();
  const [taskInput, setTaskInput] = useState('');
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && taskInput.length > 0) {
      const newTask = {
        text: taskInput,
        isDone: false,
      };

      dispatch(createTask(newTask));

      setTaskInput("");
    }
  };

  const onRemove = (id) => {
    // dispatch(removeTask(id));
    dispatch(deleteTask(id));
  }

  const onStatus = (task) => {
    dispatch(changeIsDone({...task, isDone: !task.isDone}));
  }


  const onSearch = (event) => {
    if (event.key === 'Enter') {
      if (searchInput.length > 0) {
        dispatch(setIsSearching(true));
        dispatch(searchTask(searchInput));
      } else {
        dispatch(setIsSearching(false));
      }
    }
  };

  const tasks = isSearching ? searchedTasks : tasksRedux;

  return (
    <div className="todo">
      {
        isLoading && (
          <div className="progress">
            <CircularProgress />
          </div>
        )
      }
      <Header />
      <div className="todo__input-container">
        <CustomTextField
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <CustomTextField
          label="Search Task"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={onSearch}
        />
      </div>
      {
        tasks?.map(task => (
          <div key={task.id} className="todo__card">
            <Task value={task.text} isDone={task.isDone}
                  onRemove={() => onRemove(task.id)}
                  onStatus={() => onStatus(task)} />
          </div>
        ))
      }
    </div>
  );
};

export default TodoList;
