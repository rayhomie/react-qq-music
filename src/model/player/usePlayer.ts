import { useState } from 'react'
import { createModel } from 'hox'

const usePlayer = () => {
  //getRecommend请求数据
  const [play, setPlay] = useState<boolean>(false)

  return {
    play,
    setPlay,
  }
}

export default createModel(usePlayer)
