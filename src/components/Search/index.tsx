import React, { FC, useState, useMemo } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import CONST from '@/const'
import List from './List'
import styles from './index.less'

interface SearchProps {
  prefix?: React.ReactNode
  allowClear?: boolean
  placeholder?: string
  searchData?: any[]
  onSearch?: (value: string) => void
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  onFocus?: (value: string) => void
  onSelect?: (res: string, type: string, id?: string) => void
}

const Search: FC<SearchProps> = ({
  prefix = <></>,
  placeholder = '',
  allowClear = true,
  searchData,
  onSearch = () => {},
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  onSelect = () => {},
}) => {
  const [input, setInput] = useState<string>('')
  // 值未改变不可触发
  const [pre, setPre] = useState<string>('1')
  const [showResBoard, setShowResBoard] = useState<boolean>(false)

  const HotKey = useMemo(
    () =>
      searchData?.length ? (
        searchData?.map(({ n, k }) => (
          <div
            className={styles.hotkeyItem}
            key={n}
            onClick={() => {
              setInput(k)
              onSelect(k, 'song')
            }}
          >
            {k}
          </div>
        ))
      ) : (
        <></>
      ),
    [searchData]
  )

  const SmartBox = useMemo(
    () =>
      searchData && !Array.isArray(searchData) ? (
        Object.entries(searchData as any)
          .reduce(
            (pre, cur) => {
              pre[(cur[1] as any).order] = cur
              return pre
            },
            [{}, {}, {}, {}]
          )
          .map((item: any) => (
            <div key={item[0]} className={styles.seachItem}>
              <div className={styles.title}>{(CONST['SMARTBOX_TITLE'] as any)[item[0]]}</div>
              {
                <List
                  input={input}
                  type={item[0]}
                  data={item[1]['itemlist']}
                  onSelect={(res, type, id) => {
                    setInput(res)
                    onSelect(res, type, id)
                  }}
                />
              }
            </div>
          ))
      ) : (
        <></>
      ),
    [searchData]
  )

  return (
    <>
      <div className={styles.container}>
        <div
          onClick={() => {
            input !== pre && onSearch(input)
            setPre(input)
            setShowResBoard(false)
          }}
        >
          {prefix}
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={e => {
            setInput(prev => {
              setPre(prev)
              return e.target.value
            })
            setShowResBoard(true)
            onChange(e.target.value)
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && input !== pre) {
              onSearch(input)
              setPre(input)
              setShowResBoard(false)
            }
          }}
          onBlur={e => {
            setTimeout(() => {
              setShowResBoard(false)
              onBlur(e.target.value)
            }, 200)
          }}
          onFocus={e => {
            setShowResBoard(true)
            onFocus(e.target.value)
          }}
        />
        <div
          style={allowClear && input ? {} : { visibility: 'hidden' }}
          onClick={() => {
            setInput('')
            onChange('')
          }}
        >
          {<CloseOutlined />}
        </div>
        <div
          className={classnames(styles.resBoard, {
            [styles.show]: !(
              (Array.isArray(searchData) ||
                (searchData &&
                  !Array.isArray(searchData) &&
                  Object.entries(searchData as any).every(
                    item => (item[1] as any)['itemlist'].length
                  ))) &&
              showResBoard
            ),
          })}
        >
          {input ? (
            SmartBox
          ) : (
            <>
              <div className={styles.title}>{CONST['HOTKEY_TITLE']}</div>
              {HotKey}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Search
