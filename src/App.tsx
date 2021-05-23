import React from 'react'
import Header from '@/layout/Header'
import Menu from '@/layout/Menu'
import Player from '@/layout/Player'
import styles from './app.less'

const App = () => {
  return (
    <div>
      <div className={styles.container}>
        <Menu />
        <div className={styles.rightContainer}>
          <Header />
          <div className={styles.page}></div>
          <Player />
        </div>
      </div>
    </div>
  )
}

export default App
