import React, { FC, useState } from 'react'
import Search from '@/components/Search'
import Navigation from './Navigation'
import { SearchOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import styles from './index.less'

interface HeaderProps {}

const Header: FC<HeaderProps> = props => {
  const [disabled, setDisabled] = useState<[boolean, boolean]>([true, true])

  const history = useHistory()

  const onSearch = (value: string) => {
    console.log(value)
  }

  const onChange = (value: string) => {
    console.log(value)
  }

  const onFocus = (value: string) => {
    console.log(value)
  }

  const onBlur = (value: string) => {
    console.log(value)
  }

  const onForward = () => {
    history.goForward()
    console.log(history)
  }

  const onBack = () => {
    if (history.location.pathname !== '/') {
      setDisabled([false, false])
      history.goBack()
    } else {
      setDisabled([true, false])
    }
    console.log(history)
  }

  return (
    <div className={styles.container}>
      <Navigation disabled={disabled} onForward={onForward} onBack={onBack} />
      <Search
        prefix={<SearchOutlined />}
        placeholder="搜索音乐"
        onSearch={onSearch}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}

export default Header
