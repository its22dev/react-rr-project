import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Switch, } from "antd";
import axios from "axios";
import styles from "./Create.module.scss";
import Tags from "./Tags";

const Edit = () => {
  const [tempData, setTempData] = useState({})
  const [tags, setTags] = useState([])
  const navigate = useNavigate()
  const urlparams = useParams()
  // action
  const getTarget = async () => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/article/${urlparams.id}`)
    setTempData(res.data.article)
    if (res.data.article.tag) setTags(res.data.article.tag)
    else setTags([])
  }
  const onChange = e => {
    const { id, value } = e.target
    setTempData({
      ...tempData,
      [id]: value,
    })
  }
  const onSave = async () => {
    await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/article/${urlparams.id}`, { data: { ...tempData, tag: tags } })
      .then(() => { navigate('../articles') })
      .catch((err) => { console.log(err.response.data) })
  }
  useEffect(() => {
    getTarget()
  }, [])

  return (
    <div className={styles.section}>
      <div className={styles.hdr}>
        <h3>
          編輯文章
        </h3>
      </div>
      <div className={styles.cnt}>
        <div className={styles.form}>
          <Block
            id={'title'}
            title={'文章標題'}
            defaultValue={tempData.title}
            onChange={onChange}
          />
          <Block
            id={'author'}
            title={'文章作者'}
            defaultValue={tempData.author}
            onChange={onChange}
          />
          <div className={styles.block}>
            <div className={styles.title}>
              <label htmlFor='description' >文章描述</label>
            </div>
            <div className={styles.input}>
              <Input.TextArea
                id={'description'}
                value={tempData.description}
                onChange={onChange}
              />
            </div>
          </div>
          <Block
            id={'image'}
            title={'文章圖片'}
            defaultValue={tempData.image}
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
                value={tempData.content}
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
const Block = ({ id, title, defaultValue, onChange }) => {
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
        />
      </div>
    </div>
  )
}

export default Edit;