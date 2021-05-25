import React, { FC, useEffect, useState, useRef } from 'react'
import Search from '@/components/Search'
import Navigation from './Navigation'
import { SearchOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import useApp from '@/model/useApp'
import { router } from '@/router'
import styles from './index.less'

interface HeaderProps {}

const Header: FC<HeaderProps> = props => {
  const { setSideId, setNav } = useApp()
  const history = useHistory()

  useEffect(() => {
    history.listen(state => {
      setNav(new Date().getTime())
      setSideId(router.indexOf(state.pathname))
    })
  }, [])

  const onForward = () => {
    history.goForward()
  }

  const onBack = () => {
    history.goBack()
  }

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

  return (
    <div className={styles.container}>
      <Navigation onForward={onForward} onBack={onBack} />
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
