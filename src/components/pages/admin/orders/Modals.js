import { useEffect, useState } from "react";
import { Alert, Button, Divider, Input, Switch } from "antd";
import { RiCloseLine } from "react-icons/ri";
import { CheckOutlined, CloseOutlined, ZoomInOutlined } from "@ant-design/icons";
import axios from "axios";
import styles from "./Modals.module.scss";
import Details from "./Details";
// message
import { useContext } from "react";
import { MessageContext, handleSuccessMessage, handleErrorMessage } from "../../../../store/messageStore";


const Modals = ({ mode, setModalShow, trgtOrder, setTrgtOrder, getOrders }) => {
  const [message, dispatch] = useContext(MessageContext)
  const [PaidDate, setPaidDate] = useState();
  const [CreatedDate, setCreatedDate] = useState(Number(trgtOrder.create_at))
  const [finalTotals, setFinalTotals] = useState(Object.values(trgtOrder.products).map(item => item.final_total))
  const [sum, setSum] = useState();
  const [checkTotals, setCheckTotals] = useState(true)

  const [detailShow, setDetailShow] = useState(false);
  const [orderDetail, setOrderDetail] = useState(
    Object.values(trgtOrder.products).map(item => ({
      final_total: item.final_total,
      id: item.id,
      product: item.product,
      product_id: item.product_id,
      qty: item.qty,
      total: item.total
    }))
  );

  const onSave = async (id) => {
    const tempData = {
      ...trgtOrder,
      ['paid_date']: PaidDate,
      ['create_at']: CreatedDate,
    }
    if (!tempData.is_paid) delete tempData.paid_date

    await axios.put(
      `/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/order/${id}`,
      { data: tempData }
    )
      .then((res) => {
        handleSuccessMessage(dispatch, res);
        getOrders()
        setModalShow(false)
      })
      .catch((err) => {
        handleErrorMessage(dispatch, err)
      })
  }
  const onDelete = async (id) => {
    if (mode === 'del') {
      await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/order/${id}`)
        .then((res) => {
          handleSuccessMessage(dispatch, res);
          getOrders()
          setModalShow(false)
        })
        .catch((err) => {
          handleErrorMessage(dispatch, err)
        })
    } else {
      await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/orders/all`)
        .then((res) => {
          handleSuccessMessage(dispatch, res);
          getOrders()
          setModalShow(false)
        })
        .catch((err) => {
          handleErrorMessage(dispatch, err)
        })
    }
  }
  const onChange = e => {
    const { id, value, checked } = e.target;
    if (['name', 'email', 'tel', 'address'].includes(id)) {
      setTrgtOrder({ ...trgtOrder, user: { ...trgtOrder.user, [id]: value } })
    } else if (['total'].includes(id)) {
      setTrgtOrder({ ...trgtOrder, [id]: Number(value) })
    }
    else {
      setTrgtOrder({ ...trgtOrder, [id]: value })
    }
  }
  const ChangeDate = (e) => {
    const target = e.target.id;
    const dateNOTformat = e.target.value;
    const tempDate = unixTimestamp(dateNOTformat);
    if (target === 'create_at') setCreatedDate(tempDate)
    if (target === 'paid_date') setPaidDate(tempDate)
  }
  const CloseModal = () => {
    setModalShow(false)
    setPaidDate(new Date())
  }
  useEffect(() => {
    const checkTotal = () => {
      const finalTotalSum = finalTotals.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setSum(finalTotalSum)
      if (finalTotalSum === trgtOrder.total) setCheckTotals(true)
      else setCheckTotals(false)
    }
    const checkPaid = () => {
      if (trgtOrder.is_paid === false) setPaidDate(Math.floor(new Date().getTime() / 1000))
      else setPaidDate(trgtOrder.paid_date)
    }
    checkTotal();
    checkPaid();
  }, [])


  return (mode === 'edit'
    ? <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        <div className={styles.top}>
          <h4>編輯訂單</h4>
          <div className={styles.closeIcon} onClick={CloseModal}>
            <RiCloseLine />
          </div>
        </div>
        <div className={styles.mid}>
          <div className={styles.alert}>
            <Alert
              message={`訂單總金額與訂單內容金額${checkTotals ? '' : '不'}相符${checkTotals ? '' : `，訂單金額應該是 NTD ${sum}`}`}
              type={checkTotals ? 'success' : 'error'}
              showIcon
            />
          </div>
          <div className={styles.blockGrp}>
            <Block
              id={'id'}
              title={'訂單#id'}
              defaultValue={trgtOrder.id}
              onChange={onChange}
              disabled='true'
            />
            <div className={styles.block}>
              <div className={styles.title}>
                <label htmlFor='is_paid'>訂單付款狀態</label>
              </div>
              <div className={styles.input}>
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked={trgtOrder.is_paid}
                  onChange={e => setTrgtOrder({ ...trgtOrder, ['is_paid']: e })}
                />
              </div>
            </div>
            {trgtOrder.is_paid &&
              <DateBlock
                id={'paid_date'}
                title={'訂單付款日期'}
                date={PaidDate}
                onChange={ChangeDate}
              />}
          </div>
          <div className={styles.blockGrp}>
            <div className={styles.block}>
              <div className={styles.title}>
                <label htmlFor='is_enabled'>訂單內容</label>
              </div>
              <div className={styles.input}>
                <Button
                  icon={<ZoomInOutlined />}
                  width={190}
                  onClick={() => setDetailShow(true)}
                >
                  訂單商品內容
                </Button>
              </div>
            </div>
            <Block
              id={'total'}
              title={'訂單總金額'}
              defaultValue={trgtOrder.total}
              onChange={onChange}
            />
            <DateBlock
              id={'create_at'}
              title={'訂單建立日期'}
              date={CreatedDate}
              onChange={ChangeDate}
            />
          </div>
          <Divider />
          <div className={styles.blockGrp}>
            <Block
              id={'name'}
              title={'訂購姓名'}
              defaultValue={trgtOrder.user.name}
              onChange={onChange}
            />
            <Block
              id={'email'}
              title={'訂購電子郵件'}
              defaultValue={trgtOrder.user.email}
              onChange={onChange}
            />
            <Block
              id={'tel'}
              title={'訂購聯絡方式'}
              defaultValue={trgtOrder.user.tel}
              onChange={onChange}
            />
          </div>
          <Block
            id={'address'}
            title={'訂購收件地址'}
            defaultValue={trgtOrder.user.address}
            onChange={onChange}
          />
          <div className={styles.block}>
            <div className={styles.title}>
              <label htmlFor='message'>訂單備註</label>
            </div>
            <div className={styles.input}>
              <Input.TextArea
                id={'message'}
                placeholder='訂單備註'
                defaultValue={trgtOrder.message}
                onChange={onChange}
              />
            </div>
          </div>

        </div>
        <div className={styles.btm}>
          <Button onClick={CloseModal}>取消</Button>
          <Button onClick={() => onSave(trgtOrder.id)} type='primary'>儲存</Button>
        </div>
      </div>
      {detailShow &&
        <Details
          setDetailShow={setDetailShow}
          orderDetail={orderDetail}
        />}
    </div>
    : <div className={styles.modalWrapper2}>
      <div className={styles.modal}>
        <div className={styles.top}>
          <div className={styles.closeIcon} onClick={CloseModal}>
            <RiCloseLine />
          </div>
        </div>
        <div className={styles.mid}>
          確認是否刪除<strong>{mode === 'delAll' ? '所有訂單' : ''}</strong>
          {mode === 'del' && <>
            {trgtOrder.id} <br />
            NTD {trgtOrder.total}
          </>}
        </div>
        <div className={styles.btm}>
          <Button onClick={CloseModal}>取消</Button>
          <Button onClick={() => onDelete(trgtOrder.id)} type='primary' danger>刪除</Button>
        </div>
      </div>
    </div>
  )
}

const Block = ({ id, title, defaultValue, onChange, disabled }) => {
  return (
    <div className={styles.block}>
      <div className={styles.title}>
        <label htmlFor={id}>{title}</label>
      </div>
      <div className={styles.input}>
        <input
          id={id}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
const DateBlock = ({ id, title, date, onChange }) => {
  return (
    <div className={styles.block}>
      <div className={styles.title}>
        <label htmlFor={id}>{title}</label>
      </div>
      <div className={styles.input}>
        <input
          type='date'
          id={id}
          value={DateFormat(date)}
          onChange={onChange}
        />
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
const unixTimestamp = (value) => {
  const [year, month, day] = value.split('-');
  const date = new Date(year, month - 1, day);
  const unixTimestamp = Math.floor(date.getTime() / 1000);
  return unixTimestamp;
}


export default Modals;