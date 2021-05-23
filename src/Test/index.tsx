import React from 'react'
import Hello from './Hello'
import { downloadQQMusic } from '@/api/other/index'
interface TestProps {}

const Test: React.FC<TestProps> = (props) => {
  return (
    <>
      <Hello compiler="TypeScript" framework="React" />
      <button onClick={() => downloadQQMusic()}>请求</button>
    </>
  )
}

export default Test
