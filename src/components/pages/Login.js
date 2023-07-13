import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import classNames from "classnames";
import { Alert, Button } from "antd";

const Login = () => {
  const [mode, setMode] = useState('login');
  const [data, setData] = useState({
    username: '',
    password: ''
  });
  const [loginState, setLoginState] = useState({});
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const switcher = (mode) => {
    setMode(mode)
    setLoginState({})
  }

  const onSubmit = async (e) => {
    try {
      const res = await axios.post('/v2/admin/signin', data)
      const { token, expired } = res.data;
      // save token
      document.cookie = `rrToken=${token}; expires=${new Date(expired)}; `;
      // navigate
      if (res.data.success) navigate('/admin')
    } catch (error) {
      console.error(error);
      setLoginState(error.response.data);
      console.log(error.response.data);
    }
  }

  return (
    <div className={styles.section}>
      <div className={styles.title}>
        <h2
          onClick={() => switcher('login')}
          className={classNames({ [styles.active]: mode === 'login' })}
        >
          登入
        </h2>
        <h2
          onClick={() => switcher('register')}
          className={classNames({ [styles.active]: mode === 'register' })}
        >
          註冊
        </h2>
      </div>

      {mode === 'login' &&
        <div className={styles.login}>
          {loginState.message &&
            <div className={styles.alert}>
              <Alert message={loginState.message} type="error" />
            </div>}
          <div className={styles.block}>
            <div className={styles.title}>
              <label htmlFor="email">帳號 (E-mail)</label>
            </div>
            <div className={styles.input}>
              <input
                value={data.username}
                id="email"
                name="username"
                type="email"
                placeholder="name@example.com"
                onChange={onChange}
              />
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.title}>
              <label htmlFor="password">密碼</label>
            </div>
            <div className={styles.input}>
              <input
                value={data.password}
                type="password"
                name="password"
                id="password"
                onChange={onChange}
              />
            </div>
          </div>
          <Button type="primary" onClick={onSubmit}>登入</Button>
        </div>
      }
      {mode !== 'login' &&
        <div className={styles.login}>
          不開放註冊
        </div>
      }
    </div>
  )
}

export default Login;