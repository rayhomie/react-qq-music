import { useState } from 'react'
import { createModel } from 'hox'

const useScroll = () => {
  // page页面到底
  const [bottom, setBottom] = useState<boolean>(false)
  const [singerTab, setSingerTab] = useState<string>('')

  return {
    bottom,
    setBottom,
    singerTab,
    setSingerTab,
  }
}

export default createModel(useScroll)
