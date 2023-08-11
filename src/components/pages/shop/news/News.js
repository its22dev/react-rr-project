
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Space, Pagination } from 'antd';
import { CalendarOutlined, FolderOpenOutlined, TagOutlined } from '@ant-design/icons';

import axios from 'axios';
import styles from './News.module.scss';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const News = () => {
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
            key={item.title}
            actions={[
              <IconText icon={CalendarOutlined} text={DateFormat(item.create_at)} key="list-vertical-star-o" />,
              <IconText icon={FolderOpenOutlined} text={item.tag ? item.tag[0] : '未分類'} key="list-vertical-message" />,
              <IconText icon={TagOutlined} text={item.tag ? item.tag.length : '0'} key="list-vertical-message" />,
            ]}
            extra={
              <img
                width={300}
                height={180}
                alt='image'
                src={item.image}
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

export default News