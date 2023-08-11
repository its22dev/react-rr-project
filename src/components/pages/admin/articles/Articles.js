import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Pagination, Table, } from "antd";
import { FcCheckmark, FcCancel } from "react-icons/fc";

import Modals from "./Modals";
import axios from "axios";
import styles from "./Articles.module.scss";

const Articles = () => {
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: '文章',
      dataIndex: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '日期',
      dataIndex: 'create_at',
      render: (record) => {
        const date = new Date(record * 1000);
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const dateFormat = `${y}-${m}-${d}`;
        return `${dateFormat}`
      }
    },
    {
      title: '可見狀態',
      dataIndex: 'isPublic',
      render: (record) => { return record ? <FcCheckmark /> : <FcCancel /> }
    },
    {
      title: '操作',
      render: (_, record) => {
        return <div className={styles.btnGrp}>
          <Button onClick={() => handleOpenNewWindow(record.id)} type='link'>查看</Button>
          <Button onClick={() => navigate(`./${record.id}`)} type='link'>編輯</Button>
          <Button onClick={() => Deleting(record)} type='link'>刪除</Button>
        </div>
      }

    },
  ]
  const [modalShow, setModalShow] = useState(false)
  const [articles, setArticles] = useState([])
  const [pagination, setPagination] = useState({})
  const [trgtArticle, setTrgtArticle] = useState({})
  const navigate = useNavigate()
  const handleOpenNewWindow = (recordId) => {
    const newWindow = window.open(`./#/articles/${recordId}`, "_blank")
    if (newWindow) newWindow.opener = null
  };

  // action
  const getArticles = async (page = 1) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/articles?page=${page}`)
    setArticles(res.data.articles);
    setPagination(res.data.pagination);
  }
  const Deleting = (data) => {
    setModalShow(true)
    setTrgtArticle(data)
  }
  useEffect(() => {
    getArticles();
  }, [])

  return (
    <div className={styles.section}>
      <div className={styles.hdr}>
        <Button type='primary' onClick={() => navigate('./create')}>
          新增文章
        </Button>
      </div>
      <div className={styles.cnt}>
        <Table
          dataSource={articles}
          columns={columns}
          pagination={false}
        />
      </div>
      <div className={styles.ftr}>
        <Pagination
          defaultCurrent={pagination.current_page}
          total={pagination.total_pages * 10}
          onChange={(value) => getArticles(value)}
        />
      </div>
      {modalShow &&
        <Modals
          trgtArticle={trgtArticle}
          setTrgtArticle={setTrgtArticle}
          setModalShow={setModalShow}
          getArticles={getArticles}
        />}
    </div>
  )
}


export default Articles;