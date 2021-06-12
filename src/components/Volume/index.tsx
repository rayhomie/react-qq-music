import React, { FC, useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import useClickOutside from '@/hooks/useClickOutside'
import styles from './index.less'

interface VolumeProps {
  visible?: boolean
  volume?: number
  volumeChange?: (volume: number) => void
  onClickOutside?: () => void
}

const VolumeHeight = 100
const AllHeight = 102

const Volume: FC<VolumeProps> = ({ visible = true, volume = 0, volumeChange, onClickOutside }) => {
  const [process, setProgress] = useState<number>(volume)
  const dot = useRef<any>(null)
  //控制拖拽状态
  const [drag, setDrag] = useState<boolean>(false)

  useClickOutside(dot, () => {
    onClickOutside && onClickOutside()
  })

  useEffect(() => {
    setProgress(volume)
  }, [volume])

  useEffect(() => {
    if (process > 0.95) {
      setProgress(1)
    }
    volumeChange && volumeChange(1 - process)
  }, [process])

  const mouse = (type: boolean, e: any) => {
    if (!type && drag) {
      mouseUp(e)
    }
  }

  const mouseDown = (e: any) => {
    setDrag(true)
    e.stopPropagation()
    const width = e.clientY - dot.current.offsetTop - 16
    setProgress(width / AllHeight)
  }

  const mouseMove = (e: any) => {
    if (!drag) return
    e.stopPropagation()
    const width = e.clientY - dot.current.offsetTop - 16
    setProgress(width / AllHeight)
  }

  const mouseUp = (e: any) => {
    setDrag(false)
    e.stopPropagation()
    const width = e.clientY - dot.current.offsetTop - 16
    setProgress(width / AllHeight)
  }

  return (
    <div
      className={classnames(styles.wrapper, {
        [styles.visible]: !visible,
      })}
      ref={dot}
    >
      <div
        className={styles.track}
        onMouseEnter={e => mouse(true, e)}
        onMouseLeave={e => mouse(false, e)}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
      >
        <div className={styles.progress} style={{ height: `${process * 100}%` }}>
          <div
            className={styles.dot}
            style={{
              transform: `translate(-2px,${process * VolumeHeight}px)`,
            }}
          ></div>
        </div>
      </div>
      {/* <span>{`${((1 - process) * 100) | 0}%`}</span> */}
    </div>
  )
}

export default Volume
