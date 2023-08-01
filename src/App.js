import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Landing from './containers/Landing';
import React from 'react';
import TodoList from './containers/TodoList';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/todo",
      element: <TodoList />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
