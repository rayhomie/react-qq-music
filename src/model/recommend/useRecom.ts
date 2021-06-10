import { useState } from 'react'
import { createModel } from 'hox'
import { Recommend } from './index.d'

const useApp = () => {
  //getRecommend请求数据
  const [allRecommend, setAllRecommend] = useState<Recommend>()

  const [active, setActive] = useState<string>('0')

  return {
    allRecommend,
    setAllRecommend,
    active,
    setActive,
  }
}

export default createModel(useApp)
