import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

 
  console.log("order Items",orders)
  return (
    <div>
      <div className='bg-white shadow-md p-3 font-semibold'>
        <h1>Order</h1>
      </div>
        {
          !orders[0] && (
            <NoData/>
          )
        }
        {
          orders.filter(order=>order.payment_status!='PENDING').map((order,index)=>{
            return(
              <div 
                key={order._id + index + "order"} 
                className="order rounded-lg border border-gray-200 bg-white p-4 text-sm shadow-sm"
              >
                <p className="text-gray-600 font-semibold mb-2">Order No: {order?.orderId}</p>
                
                <div className="flex items-center gap-4">
                  <img
                    src={order.product_details.image[0]} 
                    className="w-16 h-16 rounded-lg object-cover shadow-md"
                    alt="Product Image"
                  />  
                  
                  <div className="flex-1">
                    <p className="font-semibold text-gray-700 mb-1">{order.product_details.name}</p>
                    <button 
                      onClick={() => window.open(order.product_details.more_details.driveLink)}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1.5 rounded shadow-sm transition duration-200 ease-in-out"
                    >
                      Download Now
                    </button>
                  </div>
                </div>
              </div>

            )
          })
        }
    </div>
  )
}

export default MyOrders
