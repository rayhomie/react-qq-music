import React, { FC, useState, useRef, useEffect } from 'react'
import classnames from 'classnames'
import styles from './index.less'

interface ProgressProps {
  progress: number
  onControl?: (cur: number) => void
}

const Progress: FC<ProgressProps> = ({ progress, onControl }) => {
  const [dot, setDot] = useState<boolean>(false)
  const containerRef = useRef<any>(null)
  //控制拖拽时的process宽度
  const [dragCur, setDragCur] = useState<number>()
  //控制拖拽状态
  const [drag, setDrag] = useState<boolean>(false)

  const mouse = (type: boolean, e: any) => {
    setDot(type)
    if (!type && drag) {
      mouseUp(e)
    }
  }

  const mouseDown = (e: any) => {
    setDrag(true)
    const progressWidth = e.nativeEvent.clientX - containerRef.current.offsetLeft + 1
    setDragCur(progressWidth / containerRef.current.offsetWidth)
  }

  const mouseMove = (e: any) => {
    if (!drag) return
    const progressWidth = e.nativeEvent.clientX - containerRef.current.offsetLeft + 1
    setDragCur(progressWidth / containerRef.current.offsetWidth)
  }

  const mouseUp = (e: any) => {
    setDrag(false)
    setDragCur(0)
    const progressWidth = e.nativeEvent.clientX - containerRef.current.offsetLeft + 1
    onControl && onControl(progressWidth / containerRef.current.offsetWidth)
  }

  return (
    <div
      className={styles.progress}
      ref={containerRef}
      onMouseEnter={e => mouse(true, e)}
      onMouseLeave={e => mouse(false, e)}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
    >
      <div className={styles.container}>
        <div
          className={classnames(styles.progress)}
          style={{ width: `${(dragCur ? dragCur : progress) * 100}%` }}
        >
          <div className={classnames({ [styles.dot]: dot })}></div>
        </div>
      </div>
    </div>
  )
}

export default Progress
