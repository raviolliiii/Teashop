import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './assets/store.jsx'
import { CookiesProvider } from 'react-cookie'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import BasketPage from './pages/BasketPage.jsx'
import SummaryPage from './pages/SummaryPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SuccessPage from './pages/SuccessPage.jsx'

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    children: [
      { path: '', element: <ProductsPage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'basket', element: <BasketPage /> },
      { path: 'summary', element: <SummaryPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'success/:date', element: <SuccessPage/> },
      { path: '*', element: <NotFound /> }
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </CookiesProvider>
)
