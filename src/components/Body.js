import React from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import AddEditPage from './AddEditPage'
import About from './About'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Body = () => {

  const appRouter = createBrowserRouter([
    {
        path:"/",
        element: <Login />
    },
    {
        path: "/browse",
        element: <Browse />
    },
    {
      path: "/add",
      element: <AddEditPage />
    },
    {
      path: "/update/:id",
      element: <AddEditPage />
    },
    {
      path: "/about",
      element: <About />
    }
  ])

  return (
    <div>
        <ToastContainer position='top-center' />
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body