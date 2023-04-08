import React,{useEffect} from 'react'

import { loginRequired } from './../../util/loginRequired'
import Navbar from '../../components/Navbar/Navbar'
import { currentUser } from '../../util/currentUser'
import "./MyOrders.css"

function MyOrders() {

  useEffect(() => {
    loginRequired()
  }, [])

  return (
    <div>
      <Navbar user={currentUser?.name} />
      <h1>My Orders</h1>
    </div>
  )
}

export default MyOrders