import { useState, useEffect } from 'react'
import { createModel } from 'hox'

type configType = {
  content: string | React.ReactNode
  show: boolean
  delay?: number
  onClose?: () => void
}

const useMsg = () => {
  const [config, setConfig] = useState<configType>({
    content: '',
    show: false,
    delay: 1000,
    onClose: () => {},
  })

  useEffect(() => {
    if (config.show) {
      const callback = () => {
        setConfig(pre => {
          pre.onClose && pre.onClose()
          return {
            ...pre,
            content: '',
            show: false,
            onClose: () => {},
          }
        })
      }
      const timeout = setTimeout(callback, config.delay)
      return () => clearTimeout(timeout)
    }
  }, [config])

  return { config, setConfig }
}

export default createModel(useMsg)
