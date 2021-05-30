import React, { useState, useEffect, useRef, useMemo } from 'react'
import classnames from 'classnames'
import Transition from '@/components/Transition'
import styles from './index.less'

export interface PaginationProps {
  className?: string
  style?: React.CSSProperties
  pageSize?: number //每页大小
  current?: number //指针
  total: number //总条数
  disabled?: boolean //是否禁用
  showQuickJumper?: boolean //是否用快速跳转输入框
  onChange?: (next: number) => void //页码变化时回调
}

const Pagination: React.FC<PaginationProps> = props => {
  const {
    className,
    style,
    pageSize = 1,
    current,
    total,
    disabled,
    onChange,
    showQuickJumper,
  } = props
  const [cur, setCur] = useState(current) //当前的页码状态
  const [jumperTopic, setJumperTopic] = useState(false) //focus控制显示（输入后回车框）
  useEffect(() => {
    //当cur变化后实时获取到cur的值
    if (onChange && cur) {
      onChange(cur) //执行传入的回调
    }
  }, [cur])

  useEffect(() => {
    setCur(current)
  }, [current])

  //获取页数
  const getPageNum = (total: number, pageSize: number): number => {
    return Math.ceil(total / pageSize)
  }
  //useMemo缓存优化获取页数
  const pageNum = useMemo(() => getPageNum(total, pageSize), [total, pageSize])

  const generateList = (pageNum: number) => {
    if (cur)
      //cur可能为undefined，默认值为1
      return new Array(pageNum)?.fill('')?.map((item, index) => {
        //长度和填充页数相等的数组
        return (
          <>
            <div
              className={classnames(styles.item, {
                [styles.active]: cur === index + 1, //点击态
                [styles.hidden]:
                  (pageNum > 5 && cur <= 3 && index + 1 > 5) || //点击1、2、3时大于5的页码都隐藏显示
                  (pageNum > 5 && cur >= pageNum - 2 && index + 1 < pageNum - 4) || //点击倒数1，2，3时，小于倒数第四的页码隐藏
                  (pageNum > 5 &&
                    cur < pageNum - 2 &&
                    cur > 3 &&
                    (index + 1 > cur + 2 || index + 1 < cur - 2)), //点击4~n-3时，显示cur附近的（一共五个）
                [styles.show]: pageNum > 5 && (index + 1 === pageNum || index + 1 === 1), //一头一尾总是显示
                [styles.disabled]: disabled,
                [styles['active-disabled']]: cur === index + 1 && disabled,
              })}
              key={index}
              onClick={() => {
                setCur(index + 1)
              }}
            >
              {index + 1}
            </div>
            <div
              className={classnames(styles.item, {
                //控制...的显示和不显示
                [styles.hidden]: pageNum > 0,
                [styles.show]:
                  (pageNum > 5 && cur > 4 && index + 1 === 1) ||
                  (pageNum > 5 && cur < pageNum - 3 && index + 1 === pageNum - 1),
                [styles.disabled]: disabled,
              })}
              onClick={() => {
                if (pageNum > 5 && cur > 4 && index + 1 === 1) {
                  if (cur === 5) {
                    //解决bug最前面的...(当cur为5时点击...变成1才对)
                    setCur(cur - 4)
                  } else {
                    setCur(cur - 5)
                  }
                }
                if (pageNum > 5 && cur < pageNum - 3 && index + 1 === pageNum - 1) {
                  if (cur === pageNum - 4) {
                    //当cur为n-4时点击...变成n才对
                    setCur(cur + 4)
                  } else {
                    setCur(cur + 5)
                  }
                }
              }}
            >
              ...
            </div>
          </>
        )
      })
  }
  const handlePrev = () => {
    if (cur && cur > 1) {
      setCur(cur - 1)
    }
  }
  const handleNext = () => {
    if (cur && cur < pageNum) {
      setCur(cur + 1)
    }
  }
  // @ts-ignore
  const inputRef = useRef<HTMLInputElement>('')
  return (
    <div
      className={classnames(styles.generateList, className, {
        [styles.disabled]: disabled,
      })}
      style={style}
    >
      <div
        className={classnames(styles.item, {
          [styles.disabled]: disabled,
        })}
        onClick={handlePrev}
      >
        {'<'}
      </div>
      {generateList(pageNum > 0 ? pageNum : 1)}
      <div
        className={classnames(styles.item, {
          [styles.disabled]: disabled,
        })}
        onClick={handleNext}
      >
        {'>'}
      </div>
      {showQuickJumper ? (
        <div style={{ marginLeft: '20px' }} id="jump">
          <div className={styles['main-jumperTopic']}>
            跳至
            <input
              className={classnames(styles.quickJumper, {
                [styles.disabled]: disabled,
              })}
              type="text"
              ref={inputRef} //ref保存当前Input节点
              onChange={e => {
                inputRef.current.value = e.target.value
              }}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  //确认的时候跳转
                  const value = Number(inputRef.current.value)
                  if (value > 0 && value <= pageNum) {
                    setCur(value)
                  }
                  inputRef.current.value = ''
                }
              }}
              onFocus={() => {
                setJumperTopic(true)
              }}
              onBlur={() => {
                setJumperTopic(false)
              }}
            />
            <Transition
              in={jumperTopic} //控制动画
              animation="zoom-in-bottom"
              timeout={300}
              className={styles.Topic}
            >
              <div>输入后回车</div>
            </Transition>
            页
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

Pagination.defaultProps = {
  current: 1,
}
export default Pagination
