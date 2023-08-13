
import styles from './Page.module.scss';

const About = () => {

  return (<>
    <div className={styles.about}>
      <img
        alt='Record Records'
        src='https://www.nme.com/wp-content/uploads/2023/01/vinyl-outsells-cds-1392x884.jpg'
      />
      <h2>關於Record Records</h2>
      <p>Record Records是一家引領潮流的黑膠唱片公司電商網站。我們熱愛音樂，致力於將經典和獨立音樂融入每個家庭。在Record Records，您將發現豐富多彩的黑膠唱片，涵蓋各種流派和藝術家。我們提供直覺的購物體驗，讓您輕鬆瀏覽並選購心愛的音樂珍品。從經典老歌到當代尖端，我們的音樂庫網羅眾多珍貴之作。</p>
      <p>無論您是收藏家、音樂愛好者還是尋找獨特禮物的人，Record Records都是您探索音樂世界的理想之地。加入我們，感受音樂的溫度，尋找那份獨一無二的情感。</p>
      <p>聯繫我們：record_records@example.com</p>
    </div>
  </>
  )
}

export default About