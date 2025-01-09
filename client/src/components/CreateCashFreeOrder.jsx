import React, { useState } from 'react'
// import Checkout from './PaymentComponent'
import SummaryApi, { clientURL } from '../common/SummaryApi'
import { baseURL } from '../App'
import Axios from '../utils/Axios'
import Checkout from './PaymentComponent'

function CreateCashFreeOrder( { list_items, addressId, subTotalAmt, totalAmt,userDetails } ) {
    const [order_generated , setOrderGenerated] = useState('')
 

    async function createOrder(amount_total = totalAmt , phone_no='' , customer_id1 ='customer_id')
    {
        console.log("cashfree initiation started.")

        try{
            let data = await Axios({
                ...SummaryApi.cashfree_initiate, 
                data : {
                  list_items : list_items,
                  addressId : addressId,
                  subTotalAmt : subTotalAmt,
                  "order_amount": amount_total,
                    "order_currency": "INR",
                    "order_id": `devstudio_${ Date.now() }`,
                    "customer_details": {
                        "customer_id": customer_id1,
                        "customer_phone": phone_no
                    },
                    "order_meta": {
                        "return_url": clientURL
                    }
                }
              })

            console.log(data)

            if(data?.data?.success){
                setOrderGenerated(data?.data?.orderId)
                alert("payment id generated !")
                console.log(data)
            }
            
        }catch(err){
            alert("payment initiation failed.")
            console.log(err.message)
        }
    }
  return (
    <div>
        {/* <h1>Create Cash Free Order</h1>
        {
            order_generated&&<div>
                                    <p>{ order_generated&&`paymentid : ${order_generated}` }</p>
                                    <Checkout  payment_id={order_generated} />
                            </div>
       }
        <form>
            <input placeholder='amount' type='number' onChange={(e)=>setAmount(e.target.value)}/>
            <br/>
            <input placeholder='phone' type='number' onChange={(e)=>setPhone(e.target.value)}/>
            <br/>
            <input placeholder='customer Id' type='text' onChange={(e)=>setCustomerId(e.target.value)}/>
            <br/>
        </form> */}
        {
            order_generated?
            <Checkout  payment_id={order_generated} />
            :
            <button onClick={()=>createOrder()}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  >
                Pay with Cashfree
            </button>
        }
    </div>
  )
}

export default CreateCashFreeOrder