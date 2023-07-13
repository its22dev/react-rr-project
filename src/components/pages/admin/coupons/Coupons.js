import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Coupons.module.scss";
import { Button, Image, Pagination, Table, Tag, } from "antd";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import Modals from "./Modals";


const Coupons = () => {
  const columns = [
    {
      title: '優惠碼',
      align: 'center',
      dataIndex: 'code',
      render: (code, record) => < Tag color={record.is_enabled ? 'success' : 'error'} > {code}</Tag >
    },
    {
      title: '優惠名稱',
      dataIndex: 'title',
    },
    {
      title: '優惠',
      dataIndex: 'percent',
      render: (percent) => `${100 - percent}% OFF`
    },
    {
      title: '有效日期',
      dataIndex: 'due_date',
      render: (due_date) => {
        const dateFormat = new Date(due_date).getFullYear() + "-" + (new Date(due_date).getMonth() + 1) + "-" + new Date(due_date).getDate()
        return `${dateFormat}`
      }

    },
    {
      title: '可見狀態',
      dataIndex: 'is_enabled',
      render: (text) => { return text === 1 ? <FcCheckmark /> : <FcCancel /> }
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
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [trgtCpn, setTrgtCpn] = useState({});

  const getCoupons = async (page = 1) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/admin/coupons?page=${page}`)
    setCoupons(res.data.coupons);
    setPagination(res.data.pagination);
  }

  useEffect(() => {
    getCoupons();
  }, [])

  const Editing = (data) => {
    setMode('edit')
    setModalShow(true)
    setTrgtCpn(data)
  }
  const Deleting = (data) => {
    setMode('del')
    setModalShow(true)
    setTrgtCpn(data)
  }


  return (
    <div className={styles.section}>
      <div className={styles.hdr}>
        <Button type='primary' onClick={() => {
          setModalShow(true)
          setMode('create')
          setTrgtCpn({})
        }}>新增優惠</Button>
      </div>
      <div className={styles.cnt}>
        <Table
          dataSource={coupons}
          columns={columns}
          pagination={false}
        />
      </div>
      <div className={styles.ftr}>
        <Pagination
          defaultCurrent={pagination.current_page}
          total={pagination.total_pages * 10}
          onChange={(value) => getCoupons(value)}
        />
      </div>
      {modalShow &&
        <Modals
          mode={mode}
          trgtCpn={trgtCpn}
          setTrgtCpn={setTrgtCpn}
          setModalShow={setModalShow}
          getCoupons={getCoupons}
        />}
    </div>
  )
}



export default Coupons;