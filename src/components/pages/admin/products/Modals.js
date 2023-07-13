import { Button, Checkbox, Input, Upload } from "antd";
import { RiCloseLine } from "react-icons/ri";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import styles from "./Modals.module.scss";


const Modals = ({ mode, setModalShow, trgtPrdct, setTrgtPrdct, getProducts }) => {
  const onSave = async (id) => {
    if (mode === 'create') {
      await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/product`, { data: trgtPrdct })
        .then(() => {
          getProducts()
          setModalShow(false)
        })
        .catch((err) => {
          console.log(err.response.data)
          getProducts()
          setModalShow(false)
        })
    } else {
      await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/product/${id}`, { data: trgtPrdct })
        .then(() => {
          getProducts();
          setModalShow(false)
        })
        .catch((err) => {
          console.log(err.response.data)
          getProducts()
          setModalShow(false)
        })
    }
  }
  const onDelete = async (id) => {
    await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/product/${id}1`)
      .then(() => {
        getProducts()
        setModalShow(false)
      })
      .catch((err) => {
        getProducts()
        setModalShow(false)
      })
  }
  const onChange = e => {
    const { id, value, checked } = e.target;
    if (['price', 'origin_price'].includes(id)) {
      setTrgtPrdct({ ...trgtPrdct, [id]: Number(value) })
    } else if (id === 'is_enabled') {
      setTrgtPrdct({ ...trgtPrdct, [id]: +checked })
    } else {
      setTrgtPrdct({ ...trgtPrdct, [id]: value })
    }
  }
  const CloseModal = () => {
    setModalShow(false)
    setTrgtPrdct({})
  }

  return (mode !== 'del' ?
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        <div className={styles.top}>
          <h4>{mode === 'create' ? '新增商品' : `編輯商品`}</h4>
          <div className={styles.closeIcon} onClick={CloseModal}>
            <RiCloseLine />
          </div>
        </div>
        <div className={styles.mid}>
          <Block
            id={'title'}
            title={'商品標題'}
            defaultValue={trgtPrdct.title}
            onChange={onChange}
          />
          <div className={styles.blockGrp}>
            <Block
              id={'category'}
              title={'商品分類'}
              defaultValue={trgtPrdct.category}
              onChange={onChange}
            />
            <Block
              id={'unit'}
              title={'商品單位'}
              defaultValue={trgtPrdct.unit}
              onChange={onChange}
            />
          </div>
          <div className={styles.blockGrp}>
            <Block
              id={'origin_price'}
              title={'商品原價'}
              defaultValue={trgtPrdct.origin_price}
              onChange={onChange}
            />
            <Block
              id={'price'}
              title={'商品售價'}
              defaultValue={trgtPrdct.price}
              onChange={onChange}
            />
          </div>
          <div className={styles.block}>
            <div className={styles.title}>
              <label htmlFor='description'>商品描述</label>
            </div>
            <div className={styles.input}>
              <Input.TextArea
                id={'description'}
                defaultValue={trgtPrdct.description}
                onChange={onChange}
              />
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.title}>
              <label htmlFor='content'>說明內容</label>
            </div>
            <div className={styles.input}>
              <Input.TextArea
                id={'content'}
                placeholder='請輸入商品說明內容'
                defaultValue={trgtPrdct.content}
                onChange={onChange}
              />
            </div>
          </div>
          <div className={styles.blockGrp}>
            <Block
              id={'imageUrl'}
              title={'圖片網址'}
              defaultValue={trgtPrdct.imageUrl}
              onChange={onChange}
            />
            <div className={styles.block}>
              <div className={styles.title}>
                <label htmlFor='title'>或上傳圖片</label>
              </div>
              <div className={styles.input}>
                <Upload maxCount={1}><Button icon={<UploadOutlined />}>選擇檔案</Button></Upload>
              </div>
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.title}>
            </div>
            <div className={styles.input}>
              <Checkbox
                id={'is_enabled'}
                defaultChecked={trgtPrdct.is_enabled}
                onChange={onChange}
              />
              <label htmlFor='is_enabled' >可見狀態</label>
            </div>
          </div>
        </div>
        <div className={styles.btm}>
          <Button onClick={CloseModal}>取消</Button>
          <Button onClick={() => onSave(trgtPrdct.id)} type='primary'>儲存</Button>
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
          確認是否刪除商品？<br />{trgtPrdct.title}
        </div>
        <div className={styles.btm}>
          <Button onClick={CloseModal}>取消</Button>
          <Button onClick={() => onDelete(trgtPrdct.id)} type='primary' danger>刪除</Button>
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
          type={id === 'original_price' || id === 'price' ? 'number' : 'text'} />
      </div>
    </div>
  )
}


export default Modals;