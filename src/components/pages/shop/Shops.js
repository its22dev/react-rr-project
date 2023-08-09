import { useState } from 'react';
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Badge } from 'antd';
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import styles from './Shops.module.scss';

const Shops = () => {
  const navigate = useNavigate();
  const [navShow, setNavShow] = useState(false)

  const NavToggle = () => {
    if (navShow) setNavShow(false)
    else setNavShow(true)
  }

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
            <Badge count={5}>
              <Link className={styles.navLink} to='/cart'>
                <AiOutlineShoppingCart />
              </Link >
            </Badge>
          </ul>
        </div>
      </header>
      <div className={styles.content}>
        <Outlet />
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