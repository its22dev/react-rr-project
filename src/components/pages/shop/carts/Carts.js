
import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button, InputNumber } from 'antd';
import { CloseOutlined, SwapLeftOutlined } from '@ant-design/icons';
import { Loading } from '../../../elements/Loading';
import axios from 'axios';
import styles from './Carts.module.scss';

const Carts = () => {
  const navigate = useNavigate()
  const { getCart, cartData, isLoading } = useOutletContext()
  const [loadings, setLoadings] = useState([])

  const Deleting = async (id) => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/cart/${id}`)
      getCart()
    } catch (error) {
      console.log(error);
    }
  }
  const Updating = async (item, value) => {
    const data = { product_id: item.product_id, qty: value }
    setLoadings([...loadings, item.id])
    try {
      const res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/cart/${item.id}`, { data: data })
      setLoadings(loadings.filter((target) => target !== item.id))
      getCart()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCart()
  }, [])
  // console.log(cartData)


  return (<>
    <div className={styles.carts}>
      <Loading isLoading={isLoading} />
      <h2>購物車</h2>
      {cartData.total !== 0
        ? (<>
          {(cartData?.carts) && (cartData?.carts).map((item) => {
            return (
              <div className={styles.item} key={item.id}>
                <div className={styles.info}>
                  <img
                    alt={item?.product?.title}
                    width={100}
                    height={100}
                    src={item?.product?.imageUrl}
                  />
                  <div className={styles.title}>{item.product.title} ({item.product.category})</div>
                </div>
                <div className={styles.price}>NTD${item.product.price}</div>
                <div className={styles.qty}>
                  <InputNumber
                    min={1}
                    value={item.qty}
                    onChange={e => Updating(item, e)}
                    disabled={loadings.includes(item.id)}
                  />
                </div>
                <div className={styles.total_price}>NTD$ {item.final_total}</div>
                <div className={styles.action}>
                  <CloseOutlined onClick={() => Deleting(item.id)} />
                </div>
              </div>
            )
          })}
          <div className={styles.ftr}>
            <div className={styles.info}>
              <h2>總金額</h2>
              <h2>NTD$ {cartData.total}</h2>
            </div>
            <Button
              type='text'
              style={{ backgroundColor: '#4eb8dd', color: '#fff', height: '60px' }}
              onClick={() => navigate('../checkout')}
              block
            >
              確認購物車內容正確，結帳去
            </Button>
          </div>
        </>)
        : (<>
          <h3>購物車內沒有商品</h3>
          <Button
            type='text'
            style={{ backgroundColor: '#4eb8dd', color: '#fff', height: '60px' }}
            icon={<SwapLeftOutlined />}
            onClick={() => navigate('/products')}
          >
            繼續選購
          </Button>
        </>)
      }
    </div>
  </>
  )
}

export default Carts