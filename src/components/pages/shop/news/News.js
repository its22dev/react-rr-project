import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserOutlined, EditOutlined, CalendarOutlined, FolderOpenOutlined, TagOutlined } from '@ant-design/icons';

import axios from "axios";
import styles from './News.module.scss';
import noImg from '../../../../assets/image/noimg.png';

const News = () => {
  const { id } = useParams()
  const [article, setArticle] = useState({})

  const fetch = async () => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/article/${id}`)
    setArticle(res.data.article)
  }

  useEffect(() => {
    fetch()
  }, [id])


  return (
    <div className={styles.article}>
      <div className={styles.header}>
        <img
          alt={article.title}
          src={article.image !== '' ? article.image : noImg}
          height={300}
        />
        <h1>{article.title}</h1>
        <div className={styles.info}>
          <div className={styles.details}>
            <p className={styles.item}><UserOutlined />{article.author}</p>
            <p className={styles.item}>
              <Link to={`../admin/articles/${article.id}`} target='_blank'>
                <EditOutlined />編輯文章
              </Link>
            </p>
          </div>
          <div className={styles.details}>
            <p className={styles.item}><CalendarOutlined />{DateFormat(article.create_at)}</p>
            <p className={styles.item}><FolderOpenOutlined />{article.tag ? article.tag[0] : '未分類'}</p>
            <p className={styles.item}><TagOutlined />{article.tag ? article.tag.length : '0'}</p>
          </div>
        </div>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div >
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

export default News