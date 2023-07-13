import { Checkbox } from "antd";
import { RiCloseLine } from "react-icons/ri";
import styles from './Details.module.scss'

const Details = ({ orderDetail, setDetailShow }) => {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        <div className={styles.top}>
          <h4>訂單內容</h4>
          <div className={styles.closeIcon} onClick={() => setDetailShow(false)}>
            <RiCloseLine />
          </div>
        </div>
        <div className={styles.mid}>
          {orderDetail.map((item, index) => (
            <div className={styles.grp}>
              #{index + 1}
              <div className={styles.blockGrp}>
                <Block
                  id={'qty'}
                  title={'數量'}
                  value={item.product.title}
                  width={'260px'}
                />
                <Block
                  id={'qty'}
                  title={'數量'}
                  value={item.qty}
                />
                <Block
                  id={'qty'}
                  title={'單價'}
                  value={item.product.price}
                />
                <Block
                  id={'qty'}
                  title={'價格'}
                  value={item.product.price * item.qty}
                />
              </div>
              <div className={styles.blockGrp}>
                <div className={styles.block}>
                  <div className={styles.title}>
                  </div>
                  <div className={styles.input}>
                    <Checkbox
                      id={'is_enabled'}
                      checked={item.final_total !== item.total ? true : false}
                    />
                    <label htmlFor='is_enabled'>自訂價格</label>
                  </div>
                </div>
                {item.final_total !== item.total &&
                  <Block
                    id={'final_total'}
                    value={item.final_total}
                  />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
const Block = ({ id, title, value, disabled, width }) => {
  return (
    <div className={styles.block}>
      <div className={styles.title}>
        <label htmlFor={id}>{title}</label>
      </div>
      <div className={styles.input}>
        <input
          id={id}
          defaultValue={value}
          disabled={disabled}
          bordered={false}
          style={{ width: `${width}` }}
        />
      </div>
    </div>
  )
}

export default Details;