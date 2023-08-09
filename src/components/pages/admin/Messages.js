import { useContext } from "react";
import styles from "./Messages.module.scss";
import { MessageContext } from "../../../store/messageStore";
import { AiOutlineClose } from "react-icons/ai";
import { FcOk, FcHighPriority } from "react-icons/fc";

const Messages = () => {
  const [message, dispatch] = useContext(MessageContext)

  return (<>
    {message.title &&
      <div className={styles.toast}>
        <div className={styles.toastIcon}>
          {message.title === '成功' ? <FcOk /> : <FcHighPriority />}
        </div>
        <div className={styles.toastBody}>
          {message.text}
        </div>
        <AiOutlineClose onClick={() => dispatch({ type: 'CLEAR_MESSAGE' })} />
      </div >
    }
  </>
  )
}

export default Messages