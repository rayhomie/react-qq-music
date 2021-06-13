import React, { FC, useEffect, useState } from 'react'
import Search from '@/components/Search'
import Navigation from './Navigation'
import { SearchOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import useApp from '@/model/app/useApp'
import usePlayer from '@/model/player/usePlayer'
import { router, searchTab } from '@/router'
import { getHotkey as fetchHotkey, getSmartbox as fetchSmartbox } from '@/api/other'
import { debounce } from '@/utils/common'

import styles from './index.less'

interface HeaderProps {}

const Header: FC<HeaderProps> = props => {
  const { setSideId, setNav } = useApp()
  const { setSearchFocus } = usePlayer()
  const history = useHistory()
  const [fetchData, setFetchData] = useState<any>(null)

  useEffect(() => {
    history.listen(state => {
      setNav(new Date().getTime())
      setSideId(router.indexOf(state.pathname))
    })
  }, [])

  const getHotkey = async () => {
    const {
      data: {
        response: {
          data: { hotkey },
        },
      },
    } = await fetchHotkey()
    setFetchData(hotkey)
  }

  const getSmartbox = async (value: string) => {
    const {
      data: {
        response: { data },
      },
    } = await fetchSmartbox({ key: value })
    setFetchData(data)
  }

  const onForward = () => {
    history.goForward()
  }

  const onBack = () => {
    history.goBack()
  }

  const onSearch = (value: string) => {
    history.push('/CommonSearch', { key: value, remoteplace: 'song' })
  }

  const onChange = (value: string) => {
    value ? getSmartbox(value) : getHotkey()
  }

  return (
    <div className={styles.container}>
      <Navigation onForward={onForward} onBack={onBack} />
      <Search
        prefix={<SearchOutlined />}
        placeholder="搜索音乐"
        onSearch={onSearch}
        onChange={debounce(onChange, 500)}
        searchData={fetchData}
        onFocus={value => {
          setSearchFocus(true)
          value ? getSmartbox(value) : getHotkey()
        }}
        onBlur={() => {
          setSearchFocus(false)
        }}
        onSelect={(res, type, id) => {
          history.push((searchTab as any)[type], { key: res, remoteplace: type, mid: id })
        }}
      />
    </div>
  )
}

export default Header
