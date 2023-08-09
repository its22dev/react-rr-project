import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from './Item.module.scss';

const Item = () => {
  const [product, setProduct] = useState({})
  const { id } = useParams()

  const fetch = async () => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/product/${id}`)
    setProduct(res.data.product);
    console.log(res);
  }

  useEffect(() => {
    fetch();
  }, [id])


  return (<>
    <pre>{JSON.stringify(product, null, 2)}</pre>
    <div className={styles.prdctContent}>
      <div className={styles.left}>
        <img src={product.imageUrl} />
      </div>
      <div className={styles.right}>
        test
      </div>
    </div>
  </>)
}

export default Item