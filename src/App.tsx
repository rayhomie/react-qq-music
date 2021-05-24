import React from 'react'
import Router from '@/router'
import styles from './app.less'

const App = () => {
  return (
    <div>
      <div className={styles.container}>
        <Router />
      </div>
    </div>
  )
}

export default App
