import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Cart } from '../../../elements/Cart'
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Loading } from '../../../elements/Loading';
import styles from './Success.module.scss';
import axios from 'axios';

const Success = () => {
  const { orderId } = useParams()
  const { getCart } = useOutletContext()
  const navigate = useNavigate()
  const [order, setOrder] = useState({})
  const [cartData, setCartData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getOrder = async (orderId) => {
    try {
      setIsLoading(true)
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/order/${orderId}`)
      // console.log(res)
      setOrder(res.data.order)
      setCartData(Object.values(res.data.order.products))
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrder(orderId)
    getCart()
  }, [orderId])

  return (
    <div className={styles.success}>
      <Loading isLoading={isLoading} />
      <div className={styles.info}>
        <h2>訂單已成功提交</h2>
        <div className={styles.content}>
          <p>親愛的顧客，您的訂單已成功提交，我們將盡快進行處理。感謝您選擇 Record Records，期待為您提供最佳的音樂體驗。</p>
          <p>祝您有美好的一天！</p>
        </div>
        <div className={styles.ftr}>
          <Button
            style={{ height: '60px' }}
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
          >
            回到首頁
          </Button>
        </div>
      </div>
      <Cart
        title={'訂單內容'}
        data={cartData}
        final_total={order.total}
      />
    </div>
  )
}



export default Success