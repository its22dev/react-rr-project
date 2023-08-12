import { useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Input } from '../../../elements/FormElements';
import { Cart } from '../../../elements/Cart'
import { Button } from 'antd';
import { SwapLeftOutlined } from '@ant-design/icons';

import styles from './Checkout.module.scss';
import axios from 'axios';

const Checkout = () => {
  const { cartData } = useOutletContext()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    const { email, name, tel, address, message } = data
    const tempData = {
      user: {
        email: email,
        name: name,
        tel: tel,
        address: address,
      },
      message: message,
    }
    try {
      const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH_TEST}/order`, { data: tempData })
      navigate(`../success/${res.data.orderId}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.checkout}>
      <div className={styles.info}>
        <h2>訂購資訊</h2>
        <form className={styles.content} onSubmit={handleSubmit(onSubmit)}>
          <Input
            id='email'
            title={'Email'}
            placeholder={'recordrecords@example.com'}
            register={register}
            errors={errors}
            rules={{
              required: '必填',
              pattern: { value: /^\S+@\S+$/i, message: 'Email格式不正確' },
            }}
          />
          <Input
            id='name'
            title={'訂購姓名'}
            placeholder={'Record Records'}
            register={register}
            errors={errors}
            rules={{
              required: '必填',
              maxLength: { value: 20, message: '訂購姓名過長' },
            }}
          />
          <Input
            id='tel'
            title={'聯絡方式'}
            placeholder={'0912-345-678'}
            register={register}
            errors={errors}
            rules={{
              required: '必填',
              pattern: { value: /^\d{4}-\d{3}-\d{3}$/, message: '聯絡方式格式不正確' },
            }}
          />
          <Input
            id='address'
            title={'收件地址'}
            placeholder={'100 台北市中正區忠孝西路一段100號'}
            register={register}
            errors={errors}
            rules={{
              required: '必填'
            }}
          />
          <Input
            id='message'
            title={'訂單備註'}
            placeholder={'備註'}
            register={register}
            errors={errors}
          />
        </form>
        <div className={styles.ftr}>
          <Button
            type='text'
            style={{ height: '60px' }}
            icon={<SwapLeftOutlined />}
            onClick={() => navigate('/products')}
          >
            繼續選購
          </Button>
          <Button
            type='text'
            style={{ backgroundColor: '#4eb8dd', color: '#fff', width: '50%', height: '60px' }}
            onClick={handleSubmit(onSubmit)}
          >
            確認訂購
          </Button>
        </div>
      </div>
      <Cart
        title={'購物車'}
        data={cartData.carts}
        final_total={cartData.final_total}
      />
    </div>
  )
}



export default Checkout