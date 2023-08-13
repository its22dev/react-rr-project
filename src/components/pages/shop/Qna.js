import { Collapse } from 'antd';
import styles from './Page.module.scss';

const Qna = () => {
  const items = [
    { key: '0', label: '售後服務', children: <p>如果您收到的商品有損壞，請立即與 Record Records 聯繫，我們將儘快解決問題，需要提供開箱影片作為退換貨憑證。</p>, },
    { key: '1', label: '付款方式', children: <p>接受現金、信用卡作為付款方式，所有的付款過程經過加密</p>, },
    { key: '2', label: '運送 & 退換貨', children: <ul><li>由 Record Records 銷售以及出貨</li><li>標準運送時間為 3-5 個工作天</li><li>無法退換貨</li></ul>, },
    { key: '3', label: '商品庫存', children: <ul><li>產品包括黑膠唱片(LP)、CD、錄音帶(tape)等，在商品頁面中有詳細的資訊</li><li>黑膠唱片、CD 等音樂產品都有相對應的專屬包裝，以確保運送過程中不受損壞。</li></ul>, },
    { key: '4', label: '隱私政策', children: <p>收集您在提交訂單時向我們提交的個人資料。此類資料可能包括聯絡資料與付款資料。另外，當您進入Record Records網站時，會紀錄使用者上站的位址以及在相關網站內的瀏覽活動等資料。</p>, },
  ]

  return (<>
    <div className={styles.qna}>
      <h2>常見問題</h2>
      <Collapse
        size='large'
        items={items}
        defaultActiveKey={['0', '1']}
      />
    </div>
  </>
  )
}

export default Qna