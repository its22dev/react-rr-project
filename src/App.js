import { createElement, lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
// admin
import Layouts from './components/pages/admin/Layouts';
import Dashboard from './components/pages/admin/Dashboard';
import Orders from './components/pages/admin/orders/Orders';
import Products from './components/pages/admin/products/Products';
import Coupons from './components/pages/admin/coupons/Coupons'
import Articles from './components/pages/admin/articles/Articles';
import Create from './components/pages/admin/articles/Create';
import Edit from './components/pages/admin/articles/Edit';
// shop
import Shops from './components/pages/shop/Shops';
import About from './components/pages/shop/About';
import List from './components/pages/shop/products/List';
import Item from './components/pages/shop/products/Item';
import News from './components/pages/shop/News';
import Qna from './components/pages/shop/Qna';


const App = () => {
  return (
    <Routes>
      <Route path='/admin' element={<Layouts />}>
        <Route index element={<Dashboard />} />
        <Route path='orders' element={<Orders />} />
        <Route path='products' element={<Products />} />
        <Route path='coupons' element={<Coupons />} />
        <Route path='articles' element={<Articles />} />
        <Route path='articles/create' element={<Create />} />
        <Route path='articles/:id' element={<Edit />} />
      </Route>
      <Route path='/' element={<Shops />}>
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<List />} />
        <Route path='/products/:id' element={<Item />} />
        <Route path='/articles' element={<News />} />
        <Route path='/qna' element={<Qna />} />
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
