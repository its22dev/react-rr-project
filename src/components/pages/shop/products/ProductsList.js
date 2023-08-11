import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "antd";

import { ShoppingOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import styles from './ProductsList.module.scss';

const ProductsList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const getProducts = async (page) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/products?page=${page}`)
    console.log(res.data.products);
    setProducts(res.data.products);
    setPagination(res.data.pagination);
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (<>
    <div className={styles.products}>
      {products.map((prdct) => {
        return (
          <div className={styles.item} key={prdct.id}>
            <div className={styles.itemContainer}>
              <Link to={prdct.id}>
                <img alt={prdct.title} src={prdct.imageUrl} width={300} />
              </Link>
            </div>
            <div className={styles.title}><span>{prdct.title}</span></div>
            <div className={styles.price}><span>{prdct.category}</span></div>
            <div className={styles.price}><span>${prdct.price}</span></div>
            <div className={styles.link}>
              <div className={styles.cart}>
                <ShoppingOutlined onClick={() => navigate(`${prdct.id}`)} />
              </div>
              <div className={styles.info}>
                <InfoCircleOutlined onClick={() => navigate(`${prdct.id}`)} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
    <div className={styles.ftr}>
      <Pagination
        defaultCurrent={pagination.current_page}
        total={pagination.total_pages * 10}
        onChange={(value) => getProducts(value)}
      />
    </div>
  </>
  )
}

export default ProductsList