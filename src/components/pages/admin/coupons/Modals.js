import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Input, Upload } from "antd";
import { RiCloseLine } from "react-icons/ri";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import styles from "./Modals.module.scss";
// message
import { useContext } from "react";
import { MessageContext, handleSuccessMessage, handleErrorMessage } from "../../../../store/messageStore";

const Modals = ({ mode, setModalShow, trgtCpn, setTrgtCpn, getCoupons }) => {
  const [message, dispatch] = useContext(MessageContext)
  const [date, setDate] = useState(new Date());

  const onSave = async (id) => {
    if (mode === 'create') {
      await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/coupon`,
        { data: { ...trgtCpn, ['due_date']: date.getTime() } }
      )
        .then((res) => {
          handleSuccessMessage(dispatch, res);
          getCoupons()
          setModalShow(false)
        })
        .catch((err) => {
          handleErrorMessage(dispatch, err)
        })
    } else {
      await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/coupon/${id}`,
        { data: { ...trgtCpn, ['due_date']: date.getTime() } }
      )
        .then((res) => {
          handleSuccessMessage(dispatch, res);
          getCoupons()
          setModalShow(false)
        })
        .catch((err) => {
          handleErrorMessage(dispatch, err)
        })
    }
  }
  const onDelete = async (id) => {
    await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/coupon/${id}`)
      .then((res) => {
        handleSuccessMessage(dispatch, res);
        getCoupons()
        setModalShow(false)
      })
      .catch((err) => {
        handleErrorMessage(dispatch, err)
      })
  }
  const onChange = e => {
    const { id, value, checked } = e.target;
    if (id === 'percent') {
      setTrgtCpn({ ...trgtCpn, [id]: Number(value) })
    } else if (id === 'is_enabled') {
      setTrgtCpn({ ...trgtCpn, [id]: +checked })
    } else {
      setTrgtCpn({ ...trgtCpn, [id]: value })
    }
  }
  const CloseModal = () => {
    setModalShow(false)
    setTrgtCpn({})
  }
  useEffect(() => {
    if (mode === 'create') setDate(new Date())
    else setDate(new Date(trgtCpn.due_date))
  }, [])

  return (mode !== 'del' ?
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        <div className={styles.top}>
          <h4>{mode === 'create' ? '新增優惠' : `編輯優惠`}</h4>
          <div className={styles.closeIcon} onClick={CloseModal}>
            <RiCloseLine />
          </div>
        </div>
        <div className={styles.mid}>
          <Block
            id={'code'}
            title={'優惠碼'}
            defaultValue={trgtCpn.code}
            onChange={onChange}
          />
          <Block
            id={'title'}
            title={'優惠標題'}
            defaultValue={trgtCpn.title}
            onChange={onChange}
          />
          <div className={styles.blockGrp}>
            <Block
              id={'percent'}
              title={'折扣 %'}
              defaultValue={trgtCpn.percent}
              onChange={onChange}
            />
            <div className={styles.block}>
              <div className={styles.title}>
                <label htmlFor='due_date' >有效日期至</label>
              </div>
              <div className={styles.input}>
                <input
                  type='date'
                  id='due_date'
                  value={`${date.getFullYear().toString()}-${(
                    date.getMonth() + 1
                  )
                    .toString()
                    .padStart(2, 0)}-${date
                      .getDate()
                      .toString()
                      .padStart(2, 0)}`
                  }
                  onChange={e => setDate(new Date(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.title}>
            </div>
            <div className={styles.input}>
              <Checkbox
                id={'is_enabled'}
                defaultChecked={trgtCpn.is_enabled}
                onChange={onChange}
              />
              <label htmlFor='is_enabled' >可見狀態</label>
            </div>
          </div>
        </div>
        <div className={styles.btm}>
          <Button onClick={CloseModal}>取消</Button>
          <Button onClick={() => onSave(trgtCpn.id)} type='primary'>儲存</Button>
        </div>
      </div>
    </div>
    :
    <div className={styles.modalWrapper2}>
      <div className={styles.modal}>
        <div className={styles.top}>
          <div className={styles.closeIcon} onClick={CloseModal}>
            <RiCloseLine />
          </div>
        </div>
        <div className={styles.mid}>
          確認是否刪除優惠？<br />{trgtCpn.title}
        </div>
        <div className={styles.btm}>
          <Button onClick={CloseModal}>取消</Button>
          <Button onClick={() => onDelete(trgtCpn.id)} type='primary' danger>刪除</Button>
        </div>
      </div>
    </div>
  )
}

const Block = ({ id, title, defaultValue, onChange }) => {
  return (
    <div className={styles.block}>
      <div className={styles.title}>
        <label htmlFor={id}>{title}</label>
      </div>
      <div className={styles.input}>
        <input
          id={id}
          name={id}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      </div>
    </div>
  )
}


export default Modals;