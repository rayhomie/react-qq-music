import React, { FC, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import styles from './index.less'

interface SearchProps {
  prefix?: React.ReactNode
  allowClear?: boolean
  placeholder?: string
  onSearch?: (value: string) => void
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  onFocus?: (value: string) => void
}

const Search: FC<SearchProps> = ({
  prefix = <></>,
  placeholder = '',
  allowClear = true,
  onSearch = () => {},
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
}) => {
  const [input, setInput] = useState<string>('')
  // 值未改变不可触发
  const [pre, setPre] = useState<string>('1')

  return (
    <div className={styles.container}>
      <div
        onClick={() => {
          input !== pre && onSearch(input)
          setPre(input)
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
          onChange(e.target.value)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' && input !== pre) {
            onSearch(input)
            setPre(input)
          }
        }}
        onBlur={e => onBlur(e.target.value)}
        onFocus={e => onFocus(e.target.value)}
      />
      <div style={allowClear && input ? {} : { visibility: 'hidden' }} onClick={() => setInput('')}>
        {<CloseOutlined />}
      </div>
    </div>
  )
}

export default Search
