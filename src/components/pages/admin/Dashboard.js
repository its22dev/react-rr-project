import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.scss";
import { Tag } from "antd";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [numOfproducts, setNumOfProducts] = useState('');
  const [numOforders, setNumOfOrders] = useState('');
  const [numOfcoupons, setNumOfCoupons] = useState('');
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])

  const fetch = async () => {
    await axios.all([
      axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/products/all`),
      axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/orders`),
      axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/coupons`),
    ])
      .then(res => {
        setNumOfProducts(Object.keys(res[0].data.products).length);
        setNumOfOrders(res[1].data.pagination.total_pages * 10);
        setNumOfCoupons(res[2].data.pagination.total_pages * 10);
        setOrders(res[1].data.orders.slice(0, 5))
        setProducts(
          Object.values(res[0].data.products).map(item => ({
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
          }))
            .slice(Object.keys(res[0].data.products).length - 9, Object.keys(res[0].data.products).length)
            .reverse()
        )
      })
  }

  useEffect(() => {
    fetch();
  }, [])

  return (
    <div className={styles.section}>
      <div className={styles.overview}>
        <div className={styles.info1}>
          <img src="img/peeps-avatar.png" width={100} height={100} />
          <div className={styles.greetings}>
            <h2>Hello, Have a nice day!</h2>
            <p>點擊導覽列以查看更多管理功能</p>
          </div>
        </div>
        <div className={styles.info2}>
          <div className={styles.block}>
            <p>商品數量</p>
            <h1>{numOfproducts}</h1>
          </div>
          <div className={styles.block}>
            <p>訂單數量≤</p>
            <h1>{numOforders}</h1>
          </div>
          <div className={styles.block}>
            <p>優惠次數≤</p>
            <h1>{numOfcoupons}</h1>
          </div>
        </div>
      </div>
      <div className={styles.overview}>
        <div className={styles.orders}>
          <div className={styles.title}><h4>最新訂單</h4></div>
          {orders && orders.map((item) =>
            <div className={styles.block} key={item.id}>
              <div className={styles.info}>{DateFormat(item.create_at)}</div>
              <div className={styles.info}>{item.user.name} ({item.user.email})</div>
              <div className={styles.info}>NTD {item.total}</div>
              <div className={styles.info}>{item.is_paid ? <Tag color='green'>已付款</Tag> : <Tag color='red'>未付款</Tag>}</div>
            </div>
          )}
          <div className={styles.more}><Link to='./orders'>查看更多</Link></div>
        </div>
        <div className={styles.products}>
          <div className={styles.title}><h4>最新商品</h4></div>
          <div className={styles.block}>
            {products && products.map((item) =>
              <div className={styles.info} key={item.id}>
                <Link to='./products'>
                  <img
                    src={item.imageUrl}
                    width={110}
                  />
                </Link>
              </div>
            )}
          </div>
          <div className={styles.more}><Link to='./products'>查看更多</Link></div>
        </div>
      </div>
    </div>
  )
}
const DateFormat = (value) => {
  const date = new Date(value * 1000);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const dateFormat = `${y}-${m}-${d}`;
  return dateFormat;
}

export default Dashboard;