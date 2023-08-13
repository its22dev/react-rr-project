import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Button, InputNumber } from "antd";
import { Loading } from '../../../elements/Loading';
import axios from "axios";
import styles from './Product.module.scss';
import noImg from '../../../../assets/image/noimg.png';
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";

const Product = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  // img
  const [mainPic, setMainPic] = useState(null)
  // description
  const [open1, setOpen1] = useState(true)
  const [open2, setOpen2] = useState(false)
  // carts
  const [qty, setQty] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const { getCart } = useOutletContext()
  // loading
  const [isLoading, setIsLoading] = useState(false)

  const fetch = async () => {
    setIsLoading(true)
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/product/${id}`)
    setProduct(res.data.product);
    setMainPic(`${res.data.product.imageUrl}`)
    setIsLoading(false)
  }
  const onClick = (type, value) => {
    switch (type) {
      case 'increase': setQty(qty + 1)
        break;
      case 'decrease': (qty === 1) ? setQty(1) : setQty(qty - 1)
        break;
      case 'change': setQty(value)
        break;
      default:
        break;
    }
  }

  const addToCart = async () => {
    const data = { product_id: id, qty: qty }
    setIsAdding(true)
    try {
      const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/cart`, { data: data })
      // console.log(res)
      getCart();
      setIsAdding(false)
    } catch (error) {
      console.log(error)
      setIsAdding(false)
    }

  }

  useEffect(() => {
    fetch()
  }, [id])

  // console.log(product)


  return (
    <div className={styles.prdctContent}>
      <Loading isLoading={isLoading} />
      <div className={styles.left}>
        {product.imagesUrl
          ? (
            <div className={styles.imgTab}>
              <div className={styles.mainImg}>
                <img alt={product.title} src={mainPic} />
              </div>
              <div className={styles.imgList}>
                {product.imagesUrl.map((img) => {
                  return <div className={styles.singleImg}>
                    <img
                      alt={product.title}
                      src={img !== '' ? img : noImg}
                      width={96}
                      height={96}
                      onClick={() => setMainPic(img !== '' ? img : noImg)} />
                  </div>
                })}
              </div>
            </div>
          )
          : (
            <div className={styles.mainImg}>
              <img src={product.imageUrl} />
            </div>
          )
        }
      </div>
      <div className={styles.right}>
        <div className={styles.basicInfo}>
          <h2 className={styles.title}>{product.title}</h2>
          <div className={styles.price}>
            <h3>NTD$ {product.price}</h3>
          </div>
        </div>
        <div className={styles.details}>
          <span>{product.category} / {product.unit} </span>
          <div className={styles.tabs}>
            <div className={styles.tab}>
              <div className={styles.title}>
                <span onClick={() => setOpen1(!open1)} >
                  {!open1 ? <AiOutlineRight /> : <AiOutlineDown />}
                  商品簡介
                </span>
              </div>
              {open1 && <div className={styles.content}> {product.description} </div>}
            </div>
            <div className={styles.tab}>
              <div className={styles.title}>
                <span onClick={() => setOpen2(!open2)} >
                  {!open2 ? <AiOutlineRight /> : <AiOutlineDown />}
                  說明內容
                </span>
              </div>
              {open2 && <div className={styles.content}> {product.content} </div>}
            </div>
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.qtyBtn}>
            <Button
              icon={<HiMinusSm />}
              onClick={() => onClick('decrease')}
              style={{ width: '20%', height: '36px' }} />
            <InputNumber
              controls={false}
              min={1}
              step={1}
              value={qty}
              style={{ width: '60%', borderRadius: '0' }}
              onChange={value => onClick('change', value)}
            />
            <Button
              icon={<HiPlusSm />}
              onClick={() => onClick('increase')}
              style={{ width: '20%', height: '36px' }} />
          </div>
          <div className={styles.cartBtn}>
            <Button
              loading={isAdding}
              style={{ backgroundColor: '#4eb8dd', color: '#fff', width: '100%', height: '48px' }}
              onClick={() => addToCart()}
            >
              加入購物車
            </Button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Product