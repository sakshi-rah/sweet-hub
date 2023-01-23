import React, { useState, useEffect } from 'react'
import axios from "axios"
import "./Home.css"
import FoodItemCard from "./../../components/FoodItemCard/FoodItemCard"
import { currentUser } from './../../util/currentUser'
import { loginRequired } from "./../../util/loginRequired"
import Navbar from "./../../components/Navbar/Navbar"
import mithaiImg from "./../../images/mithai.jpg"

function Home() {

  const [searchText, setSearchText] = useState("")
  const [currentFoodItems, setCurrentFoodItems] = useState([])

  async function fetchAllItems() {
    console.log("Fetching All Items");
    const response = await axios.get('/allFoodItems')
    console.log(response.data.data);
    setCurrentFoodItems(response.data.data)
  }

  async function fetchSpecificItems() {
    console.log("Fetching Specific Items");
    const response = await axios.get(`/foodItemByTitle?title=${searchText}`)
    console.log(response.data.data);
    setCurrentFoodItems(response.data.data)
  }

  useEffect(() => {
    if (searchText.length > 0) {
      fetchSpecificItems()
    }
    else {
      fetchAllItems()
    }
  }, [searchText])

  function logOut() {
    localStorage.removeItem('currentUser');
    window.location.href = "/login"
  }

  useEffect(() => {
    loginRequired()
  }, [])

  return (
    <div className='gradient-bg'>
      <Navbar user={currentUser?.name} />
      <div>
      <div>

</div>
        <div>
          <img src={mithaiImg} className="mithaiimg" />
        </div>
        
      </div>
      <div className='food-items-result'>
        <div className='row '>
          {
            currentFoodItems?.map((foodItem, index) => {
              return (<FoodItemCard category={foodItem?.category} description={foodItem?.description}
                imgUrl={foodItem?.imgUrl} price={foodItem?.price} title={foodItem?.title} key={index} />)
            })
          }
        </div>
      </div>

      <button type='button' className='btn btn-info'
        onClick={logOut}>Logout
      </button>

    </div>
  )
}

export default Home