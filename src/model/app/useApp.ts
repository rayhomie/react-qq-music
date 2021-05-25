import { useState } from 'react'
import { createModel } from 'hox'

const useApp = () => {
  //侧边栏的id
  const [sideId, setSideId] = useState<number>(0)
  //导航栏被点击
  const [nav, setNav] = useState<number>(0)
  return {
    sideId,
    setSideId,
    nav,
    setNav,
  }
}

export default createModel(useApp)
