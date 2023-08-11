
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Space, Pagination } from 'antd';
import { CalendarOutlined, FolderOpenOutlined, TagOutlined } from '@ant-design/icons';

import axios from 'axios';
import styles from './NewsList.module.scss';
import noImg from '../../../../assets/image/noimg.png';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const NewsList = () => {
  const [articles, setArticles] = useState([])
  const [pagination, setPagination] = useState({})

  const getArticles = async (page = 1) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/articles?page=${page}`)
    console.log(res)
    setArticles(res.data.articles)
    setPagination(res.data.pagination)
  }

  console.log(articles)
  console.log(pagination)

  useEffect(() => {
    getArticles();
  }, [])

  return (<>
    <div className={styles.news}>
      <List
        itemLayout='vertical'
        size='large'
        dataSource={articles}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText icon={CalendarOutlined} text={DateFormat(item.create_at)} />,
              <IconText icon={FolderOpenOutlined} text={item.tag ? item.tag[0] : '未分類'} />,
              <IconText icon={TagOutlined} text={item.tag ? item.tag.length : '0'} />,
            ]}
            extra={
              <img
                width={300}
                height={180}
                alt={item.title}
                src={item.image !== '' ? item.image : noImg}
              />
            }
          >
            <List.Item.Meta
              title={<Link to={`${item.id}`}>{item.title}</Link>}
              description={item.author}
            />
            {item.description}
          </List.Item>
        )}
      />
    </div>
    <div className={styles.ftr}>
      <Pagination
        defaultCurrent={pagination.current_page}
        total={pagination.total_pages * 10}
        onChange={(value) => getArticles(value)}
      />
    </div>
  </>
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

export default NewsList