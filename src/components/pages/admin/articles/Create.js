import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Switch, } from "antd";
import axios from "axios";
import styles from "./Create.module.scss";
import Tags from "./Tags";

const Create = () => {
  const [tempData, setTempData] = useState({
    'title': '',
    'description': '',
    'image': '',
    'create_at': getToday(),
    'author': '',
    'isPublic': false,
    'content': ''
  })
  const [tags, setTags] = useState([])
  const navigate = useNavigate()
  const onChange = e => {
    const { id, value } = e.target
    setTempData({
      ...tempData,
      [id]: value,
    })
  }
  const onSave = async () => {
    await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/article`, { data: { ...tempData, tag: tags } })
      .then(() => { navigate('../articles') })
      .catch((err) => { console.log(err.response.data) })
  }

  return (
    <div className={styles.section}>
      <div className={styles.hdr}>
        <h3>
          新增文章
        </h3>
      </div>
      <div className={styles.cnt}>
        <div className={styles.form}>
          <Block
            id={'title'}
            title={'文章標題'}
            onChange={onChange}
          />
          <Block
            id={'author'}
            title={'文章作者'}
            onChange={onChange}
          />
          <div className={styles.block}>
            <div className={styles.title}>
              <label htmlFor='description' >文章描述</label>
            </div>
            <div className={styles.input}>
              <Input.TextArea
                id={'description'}
                onChange={onChange}
              />
            </div>
          </div>
          <Block
            id={'image'}
            title={'文章圖片'}
            onChange={onChange}
          />
          <div className={styles.block}>
            <div className={styles.title}>
              <label htmlFor='content'>文章內容 (請貼HTML)</label>
            </div>
            <div className={styles.input}>
              <Input.TextArea
                id='content'
                rows={15}
                onChange={onChange}
              />
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.title}>
              <label htmlFor='tags'>文章Tags</label>
            </div>
            <div className={styles.tagInput}>
              <Tags
                tags={tags}
                setTags={setTags}
              />
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.title}>
              <label htmlFor='isPublic' >文章可見狀態</label>
            </div>
            <div className={styles.input}>
              <Switch
                id={'isPublic'}
                checked={tempData.isPublic}
                onChange={e => setTempData({ ...tempData, ['isPublic']: e })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ftr}>
        <div className={styles.btnGrp}>
          <Button onClick={onSave} type='primary'>儲存</Button>
          <Button onClick={() => navigate('../articles')}>取消</Button>
        </div>
      </div>
    </div>
  )
}
const Block = ({ id, title, onChange }) => {
  return (
    <div className={styles.block}>
      <div className={styles.title}>
        <label htmlFor={id}>{title}</label>
      </div>
      <div className={styles.input}>
        <input
          id={id}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
const getToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const timestamp = Math.floor(today.getTime() / 1000)
  return timestamp
}
export default Create;