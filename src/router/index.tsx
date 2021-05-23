import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from '@/page/Home'

const MyRouter = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home}></Route>
    </BrowserRouter>
  )
}

export default MyRouter
