import { createElement, lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Layouts from './components/pages/admin/Layouts';
import Dashboard from './components/pages/admin/Dashboard';
import Orders from './components/pages/admin/orders/Orders';
import Products from './components/pages/admin/products/Products';
import Coupons from './components/pages/admin/coupons/Coupons'
import Articles from './components/pages/admin/articles/Articles';
import Create from './components/pages/admin/articles/Create';
import Edit from './components/pages/admin/articles/Edit';


const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/admin' element={<Layouts />}>
        <Route index element={<Dashboard />} />
        <Route path='orders' element={<Orders />} />
        <Route path='products' element={<Products />} />
        <Route path='coupons' element={<Coupons />} />
        <Route path='articles' element={<Articles />} />
        <Route path='articles/create' element={<Create />} />
        <Route path='articles/:id' element={<Edit />} />
      </Route>
    </Routes >)
}

const routes = [
  // dashboard
  {
    path: '/dashboard',
    element: './dashboard/Dashboard'
  },
]
export default App;
