
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../../elements/Loading';
import axios from 'axios';
import styles from './Page.module.scss';
import banner from '../../../assets/image/banner.jpg';

const Home = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetch = async () => {
    setIsLoading(true)
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/products?page=1`)
    setProducts(res.data.products.slice(0, 4))
    setIsLoading(false)
  }
  useEffect(() => {
    fetch()
  }, [])

  console.log(products);

  return (<>
    <Loading isLoading={isLoading} />
    <div className={styles.home}>
      <div className={styles.banner}>
        <img
          alt='Record Records'
          src={banner}
        />
        <div className={styles.detail}>
          <h1>感受音樂 感受生活</h1>
          <h3>音樂的靈魂由此展開</h3>
          <p>領略音樂前線，擁有豐富多彩音樂產品，涵蓋各種流派和藝術家，即刻享受</p>
        </div>
      </div>
      <div className={styles.content}>
        <h1>新品上架</h1>
        <div className={styles.list}>
          {products.map((item) => {
            return (
              <div className={styles.item} key={item.id}>
                <div className={styles.image}>
                  <img alt={item.title} src={item.imageUrl} width={300} />
                </div>
                <Link to={`/products/${item.id}`}>
                  <div className={styles.detail}>
                    <div className={styles.title}><span>{item.title}</span></div>
                    <div className={styles.price}><span>${item.price}</span></div>
                    <div className={styles.category}><span> -- {item.category} -- </span></div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div >
  </>
  )
}

export default Home