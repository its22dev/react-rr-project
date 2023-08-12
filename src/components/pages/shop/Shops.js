import { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Badge } from 'antd';
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import axios from 'axios';
import styles from './Shops.module.scss';

const Shops = () => {
  const navigate = useNavigate();
  const [navShow, setNavShow] = useState(false)
  const [cartData, setCartData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const getCart = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/cart`)
      setCartData(res.data.data)
      setIsLoading(false)
      // console.log(res)
    } catch (error) {
      console.log(error);
    }
  }

  const NavToggle = () => {
    if (navShow) setNavShow(false)
    else setNavShow(true)
  }

  useEffect(() => {
    getCart()
  }, [])


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.topnav}>
          <ul className={styles.title}>
            <a href="#">Record Records</a>
          </ul>
          <ul>
            {navs.map((nav =>
              <Link className={styles.navLink} to={nav.path} >
                {nav.title}
              </Link >
            ))}
          </ul>
          <ul>
            <span
              className={styles.trigger}
              onClick={NavToggle}
            >
              <AiOutlineMenu />
            </span>
            <Link className={styles.navLink} to='/carts'>
              <Badge count={cartData?.carts?.length}>
                <AiOutlineShoppingCart />
              </Badge>
            </Link >
          </ul>
        </div>
      </header>
      <div className={styles.content}>
        <Outlet context={{ getCart, cartData, isLoading }} />
      </div>
      <footer className={styles.footer}>
        <div className={styles.block}>
          copyright © Record Records. all rights reserved
        </div>
        <div className={styles.block}>
          <ul>
            {footer_nav.map((nav) =>
              <Link to={nav.path}>{nav.title}</Link>
            )}
          </ul>
        </div>
      </footer>
    </div >
  )
}
const navs = [
  {
    path: '/about',
    title: '關於我們',
  },
  {
    path: '/products',
    title: '產品列表',
  },
  {
    path: '/articles',
    title: '最新消息',
  },
  {
    path: '/qna',
    title: '常見問題',
  },
]
const footer_nav = [
  {
    path: '/login',
    title: '會員登入',
  },
  {
    path: '/admin',
    title: '管理後臺',
  },
]
export default Shops;