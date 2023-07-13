import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Pagination, Table } from "antd";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import Modals from "./Modals";
import axios from "axios";
import styles from "./Orders.module.scss";


const Orders = () => {
  const navigat = useNavigate();
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: '訂單金額',
      dataIndex: 'total',
      render: (total) => `NTD ${total}`
    },
    {
      title: '會員名稱',
      render: (record) => record?.user?.name
    },
    {
      title: '會員Email',
      render: (record) => record?.user?.email
    },
    {
      title: '訂單成立日期',
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
      title: '付款狀態',
      dataIndex: 'is_paid',
      render: (is_paid) => { return is_paid ? <FcCheckmark /> : <FcCancel /> }
    },
    {
      title: '編輯',
      render: (_, record) => {
        return <div className={styles.btnGrp}>
          <Button onClick={() => Editing(record)} type='primary' >查看</Button>
          <Button onClick={() => Editing(record)}>編輯</Button>
          <Button onClick={() => Deleting(record)} type='primary' danger>刪除</Button>
        </div>
      }

    },
  ]
  const [modalShow, setModalShow] = useState(false);
  const [mode, setMode] = useState('edit');
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [trgtOrder, setTrgtOrder] = useState({});

  const getOrders = async (page = 1) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/orders?page=${page}`)
    setOrders(res.data.orders);
    setPagination(res.data.pagination);
  }

  const Editing = (data) => {
    setMode('edit')
    setModalShow(true)
    setTrgtOrder(data)
  }
  const Deleting = (data) => {
    setMode('del')
    setModalShow(true)
    setTrgtOrder(data)
  }
  const DeleteAll = () => {
    setModalShow(true)
    setMode('delAll')
  }

  useEffect(() => {
    getOrders();
  }, [])


  return (
    <div className={styles.section}>
      <div className={styles.hdr}>
        <Button
          type='primary'
          onClick={DeleteAll}
          danger>
          刪除所有訂單
        </Button>
      </div>
      <div className={styles.cnt}>
        <Table
          dataSource={orders}
          columns={columns}
          pagination={false}
        />
      </div>
      <div className={styles.ftr}>
        <Pagination
          defaultCurrent={pagination.current_page}
          total={pagination.total_pages * 10}
          onChange={(value) => getOrders(value)}
        />
      </div>
      {modalShow &&
        <Modals
          mode={mode}
          trgtOrder={trgtOrder}
          setTrgtOrder={setTrgtOrder}
          setModalShow={setModalShow}
          getOrders={getOrders}
        />}
    </div>
  )
}



export default Orders;