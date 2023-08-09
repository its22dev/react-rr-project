import { createContext } from "react";

// useContext 跨元件傳遞
export const MessageContext = createContext({})
export const initState = {
  type: '',
  title: '',
  text: ''
}

// reducer
export const messageReducer = (state, action) => {
  switch (action.type) {
    case "POST_MESSAGE":
      return { ...action.payload }
    case "CLEAR_MESSAGE":
      return { ...initState }
    default:
      return state;
  }
}

export const handleSuccessMessage = (dispatch, res) => {
  dispatch({ type: 'POST_MESSAGE', payload: { type: 'success', title: '成功', text: res.data.message, } });
  setTimeout(() => {
    dispatch({ type: 'CLEAR_MESSAGE', });
  }, 3000);
}
export const handleErrorMessage = (dispatch, err) => {
  dispatch({
    type: 'POST_MESSAGE',
    payload: { type: 'error', title: '失敗', text: Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message.join(' / ') : err?.response?.data?.message, }
  })
  setTimeout(() => {
    dispatch({ type: 'CLEAR_MESSAGE', });
  }, 3000);
}