import { createElement, lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
// admin
import Layouts from './components/pages/admin/Layouts';
import Dashboard from './components/pages/admin/Dashboard';
import Orders from './components/pages/admin/orders/Orders';
import Products from './components/pages/admin/products/Products';
import Coupons from './components/pages/admin/coupons/Coupons'
// articles
import Articles from './components/pages/admin/articles/Articles';
import Create from './components/pages/admin/articles/Create';
import Edit from './components/pages/admin/articles/Edit';

// shop
import Shops from './components/pages/shop/Shops';
import Home from './components/pages/shop/Home';
// carts
import Carts from './components/pages/shop/carts/Carts';
// checkout
import Checkout from './components/pages/shop/carts/Checkout';
import Success from './components/pages/shop/carts/Success';
// single page
import About from './components/pages/shop/About';
import Qna from './components/pages/shop/Qna';
// products
import ProductsList from './components/pages/shop/products/ProductsList';
import Product from './components/pages/shop/products/Product';
// list
import NewsList from './components/pages/shop/news/NewsList';
import News from './components/pages/shop/news/News';


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
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/carts' element={<Carts />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success/:orderId' element={<Success />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<ProductsList />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/articles' element={<NewsList />} />
        <Route path='/articles/:id' element={<News />} />
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
