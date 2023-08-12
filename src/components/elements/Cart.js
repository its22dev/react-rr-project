import styles from './Cart.module.scss';

export const Cart = ({ title, data, final_total }) => {
  // console.log(data)

  return (data &&
    <div className={styles.cart}>
      <h2>{title ? title : '購物車'}</h2>
      <div className={styles.list}>
        {data.map((item) => {
          return (
            <div className={styles.item} key={item.id}>
              <div className={styles.img}>
                <img
                  alt={item?.product?.title}
                  width={80}
                  height={80}
                  src={item?.product?.imageUrl}
                />
              </div>
              <div className={styles.detail}>
                <div className={styles.title}>{item.product.title} ({item.product.category})</div>
                <div className={styles.unit_price}>NTD$ {item.product.price}</div>
              </div>
              <div className={styles.price}>
                <div className={styles.qty}>x{item.qty}</div>
                <div>NTD$ {item.final_total}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.ftr}>
        <h2>總金額</h2>
        <h2>NTD$ {final_total}</h2>
      </div>
    </div>
  )
}
