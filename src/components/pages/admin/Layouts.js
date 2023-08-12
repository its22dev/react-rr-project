import { useState, useEffect, useReducer } from 'react';
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import styles from './Layouts.module.scss';
import axios from "axios";
import { Breadcrumb, Button } from 'antd';
import { AiOutlineMenu } from "react-icons/ai";
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { AiOutlineClose, AiOutlineLaptop, AiOutlineShopping, AiOutlineWallet, AiOutlineContainer, AiOutlineFileText } from "react-icons/ai";
import { FcHome } from "react-icons/fc";

import Messages from './Messages';
import { MessageContext, messageReducer, initState } from '../../../store/messageStore';

const Layouts = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathNow = pathname.substr(7, pathname.length - 1);
  const [navShow, setNavShow] = useState(false)
  const [breadcrumb, setBreadcrumb] = useState('')

  const reducer = useReducer(messageReducer, initState)

  const NavToggle = () => {
    if (navShow) setNavShow(false)
    else setNavShow(true)
  }
  const onClick = e => {
    const { innerText } = e.target;
    switch (innerText) {
      case '管理首頁':
        navigate('/admin/')
        break;
      case '訂單列表':
        navigate('/admin/orders')
        break;
      case '商品列表':
        navigate('/admin/products')
        break;
      case '優惠列表':
        navigate('/admin/coupons')
        break;
    }
    setNavShow(false)
  }
  const logout = () => {
    document.cookie = 'rrToken=';
    navigate('/login')
  }
  const CheckBreadcrumb = () => {
    switch (pathNow) {
      case '':
        setBreadcrumb('')
        break;
      case 'orders':
        setBreadcrumb('訂單列表')
        break;
      case 'products':
        setBreadcrumb('商品列表')
        break;
      case 'coupons':
        setBreadcrumb('優惠列表')
        break;
      case 'articles':
        setBreadcrumb('文章列表')
        break;
      default:
        break;
    }
  }

  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('rrToken='))
    ?.split('=')[1];
  axios.defaults.headers.common['Authorization'] = token;


  useEffect(() => {
    const checkToken = async () => {
      try {
        await axios.post('/v2/api/user/check')
      } catch (error) {
        console.error(error);
        if (!error.response.data.success) navigate('/login')
      }
    }

    // check token vaildation
    if (!token) {
      return navigate('/login')
    }
    checkToken()
    CheckBreadcrumb()
  }, [navigate, token])


  return (
    <MessageContext.Provider value={reducer}>
      <div className={styles.container} >
        <div className={styles.sidebar}>
          <span
            className={styles.trigger}
            onClick={NavToggle}
          >
            <AiOutlineMenu />
          </span>
          {navShow &&
            <div className={styles.mbNav}>
              <span className={styles.navClose} onClick={NavToggle}><AiOutlineClose /></span>
              {navs.map((nav =>
                <span onClick={e => onClick(e)}>{nav.icon}{nav.title}</span>
              ))}
            </div>}
          <div className={styles.header}>
            <h3><FcHome />ADMIN</h3>
          </div>
          <ul>
            {navs.map((nav =>
              <Link className={styles.navLink} to={nav.path} >
                <li>{nav.icon}{nav.title}</li>
              </Link >
            ))}
          </ul>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.breadcrumb}>
              <Breadcrumb
                separator=">"
                items={[
                  {
                    href: '',
                    title: (<><HomeOutlined /><span>Record Records</span></>),
                  },
                  {
                    href: '#/admin',
                    title: (<><SettingOutlined /><span>管理後臺</span></>),
                  },
                  {
                    href: `/#/admin/${pathNow}`,
                    title: `${breadcrumb}`,
                  }
                ]}
              />
            </div>
            <div className={styles.member}>
              <img src="img/peeps-avatar.png" width={32} />
              <Button type='text' onClick={logout}>登出</Button>
            </div>

          </div>
          <Outlet />
        </div>
        <div className={styles.message}>
          <Messages />
        </div>
      </div >
    </MessageContext.Provider>
  )
}
const navs = [
  {
    path: '/admin',
    icon: <AiOutlineLaptop />,
    title: '後台首頁',
  },
  {
    path: '/admin/orders',
    icon: <AiOutlineContainer />,
    title: '訂單列表',
  },
  {
    path: '/admin/products',
    icon: <AiOutlineShopping />,
    title: '商品列表',
  },
  {
    path: '/admin/coupons',
    icon: <AiOutlineWallet />,
    title: '優惠列表',
  },
  {
    path: '/admin/articles',
    icon: <AiOutlineFileText />,
    title: '文章列表',
  },
]
export default Layouts;