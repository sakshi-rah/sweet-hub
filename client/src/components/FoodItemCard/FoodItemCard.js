import React,{useState} from 'react'
import swal from 'sweetalert'
import "./FoodItemCard.css"

function FoodItemCard({imgUrl, price, description, title, category}) {
    const [quantity, setQuantity] = useState(1)

    async function addToList(){
     const listObject = {
       name: title,
       price: price,
       quantity: quantity
     }
  
     const existingList = JSON.parse(localStorage.getItem('list')) || []
  
     existingList.push(listObject)
  
     localStorage.setItem('list', JSON.stringify(existingList))
  
     await swal({
        title: "Added to List",
        icon: "success",
     })
     window.location.reload()
    }

    return (
        <div>
            <div className='col-md-3 display-flex'>
                <div>
                    <img src={imgUrl} alt='' className='food-card-img' />
                </div>
                <h3>{title}</h3>
                <p>{description || title}</p>
                <p>{price}/- Only</p>
                <span>{category}</span>

                <div className='quantity-btn-container'>
                    <span className='qnt-btn' onClick={(e) => { setQuantity(quantity - 1) }}>-</span>
                    <span className='qnt-text'>{quantity}</span>
                    <span className='qnt-btn' onClick={(e) => { setQuantity(quantity + 1) }}>+</span>
                </div>

                <div>
                    <button type="button" className='btn-add-to-list' onClick={addToList}>Add To List</button>
                </div>
            </div>

        </div>
    )
}

export default FoodItemCard