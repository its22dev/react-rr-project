import { Button, Checkbox, Input, Upload } from "antd";
import { RiCloseLine } from "react-icons/ri";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import styles from "./Modals.module.scss";

const Modals = ({ mode, setModalShow, trgtArticle, setTrgtArticle, getArticles }) => {
  const onDelete = async (id) => {
    await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/article/${id}`)
      .then(() => {
        getArticles()
        setModalShow(false)
      })
      .catch((err) => {
        getArticles()
        setModalShow(false)
      })
  }
  const CloseModal = () => {
    setModalShow(false)
    setTrgtArticle({})
  }

  return (
    <div className={styles.modalWrapper2}>
      <div className={styles.modal}>
        <div className={styles.top}>
          <div className={styles.closeIcon} onClick={CloseModal}>
            <RiCloseLine />
          </div>
        </div>
        <div className={styles.mid}>
          確認是否刪除文章？<br />{trgtArticle.title}
        </div>
        <div className={styles.btm}>
          <Button onClick={CloseModal}>取消</Button>
          <Button onClick={() => onDelete(trgtArticle.id)} type='primary' danger>刪除</Button>
        </div>
      </div>
    </div>
  )
}

export default Modals;