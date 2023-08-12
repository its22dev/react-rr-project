import { useState } from 'react';
import { Input, Tag, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Tags = ({ tags, setTags }) => {
  const [inputVisible, setInputVisible] = useState(false)
  // style
  const { token } = theme.useToken()
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  }
  const tagInputStyle = {
    width: 100,
    verticalAlign: 'top',
    padding: '0 6px',
  }
  // action
  const onClose = (index) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }
  const EnterNewTag = e => {
    const newTags = [...tags]
    newTags.push(e.target.value)
    setTags(newTags)
    setInputVisible(false)
  }
  // just for test
  // console.log(tags)

  return (<>
    {tags && tags.map((tag, index) =>
      <Tag closable onClose={e => onClose(index)} key={tag}>{tag}</Tag>
    )}
    {inputVisible
      ? (
        <Input
          type='text'
          size='small'
          style={tagInputStyle}
          onBlur={() => setInputVisible(false)}
          onPressEnter={EnterNewTag}
        />
      )
      : (
        <Tag style={tagPlusStyle} onClick={() => setInputVisible(true)}>
          <PlusOutlined /> 新增文章Tag
        </Tag>
      )
    }
  </>)
}

export default Tags;