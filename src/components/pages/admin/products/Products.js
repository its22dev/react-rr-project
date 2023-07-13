import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Products.module.scss";
import { Button, Image, Pagination, Table, } from "antd";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import Modals from "./Modals";

const Products = () => {
  const columns = [
    {
      title: '商品圖片',
      align: 'center',
      dataIndex: 'imageUrl',
      render: (text) =>
        <Image
          width={75}
          src={text}
        />
    },
    {
      title: '商品名稱',
      dataIndex: 'title',
    },
    {
      title: '商品售價',
      dataIndex: 'price',
      render: (text) => `NTD ${text}`
    },
    {
      title: '商品分類',
      dataIndex: 'category',
    },
    {
      title: '可見狀態',
      dataIndex: 'is_enabled',
      render: (text) => { return text === 1 ? <FcCheckmark /> : <FcCancel /> }
    },
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: '編輯',
      render: (_, record) => {

        return <div className={styles.btnGrp}>
          <Button onClick={() => Editing(record)}>編輯</Button>
          <Button onClick={() => Deleting(record)} type='primary' danger>刪除</Button>
        </div>
      }

    },
  ]
  const [modalShow, setModalShow] = useState(false);
  const [mode, setMode] = useState('create');
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [trgtPrdct, setTrgtPrdct] = useState({});

  const getProducts = async (page = 1) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/products?page=${page}`)
    setProducts(res.data.products);
    setPagination(res.data.pagination);
  }

  useEffect(() => {
    getProducts();
  }, [])

  const Editing = (data) => {
    setMode('edit')
    setModalShow(true)
    setTrgtPrdct(data)
  }
  const Deleting = (data) => {
    setMode('del')
    setModalShow(true)
    setTrgtPrdct(data)
  }

  return (
    <div className={styles.section}>
      <div className={styles.hdr}>
        <Button type='primary' onClick={() => {
          setModalShow(true)
          setMode('create')
          setTrgtPrdct({})
        }}>新增商品</Button>
      </div>
      <div className={styles.cnt}>
        <Table
          bordered
          dataSource={products}
          columns={columns}
          pagination={false}
        />
      </div>
      <div className={styles.ftr}>
        <Pagination
          defaultCurrent={pagination.current_page}
          total={pagination.total_pages * 10}
          onChange={(value) => getProducts(value)}
        />
      </div>
      {modalShow &&
        <Modals
          mode={mode}
          trgtPrdct={trgtPrdct}
          setTrgtPrdct={setTrgtPrdct}
          setModalShow={setModalShow}
          getProducts={getProducts}
        />}
    </div>
  )
}



export default Products;