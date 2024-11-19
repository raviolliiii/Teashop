import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductPage from './pages/ProductPage.jsx'

const router = createBrowserRouter([
  {
    path:'/',               element: <App/>,
    children:[
      {path: '/',           element: <ProductsPage/>},
      {path: 'product/:id', element: <ProductPage/>},
      {path: 'login',       element: <LoginPage/>},
      {path: '*',           element: <NotFound/>}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
