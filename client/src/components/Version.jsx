import React, { version } from 'react'
import isAdmin from '../utils/isAdmin'
import { useSelector } from 'react-redux'

function Version() {
    const versions = [
        {
            version:'1.3',
            data:['Payments PENDING will not be showed' , 'add address tab at UserMenu.jsx component removed' , 'Social media icons refrers added for sanjay' , 'Banner image changed']
        },
        {
            version:'1.4',
            data:['admin dashboard changes' , 'all users tab added' , 'all payments tab added' , 'profile dropdown changed as per new need']
        },
        {
            version:'1.5',
            data:['search bar place holder and animations changed, functionality disabled' , 'CATEGORIES icons changes']
        },
        {
            version:'1.6',
            data:['RZP , multiple payments will be accepted !, change made only on backend' , 'index.html icons added' , 'chat bot integrated' , 'Cart side delivery time removed' , 'add and remove to cart , icons added']
        },
        {
            version:'1.7',
            data : ['Chat bot removed' , 'Date of product purchase added in My Orders' , 'Failed purchases showed in User Orders' , 'advertisement banner at Checkout Page added'  ]
        },
        {
            version:'1.8',
            data : ['Mobile view updated for Sub-Categories page' , 'Recomendation system added under complete produuct' , 'on-refresh products shuffled' , 'recomendation system for Mobile updated' , 'Google OAuth added' , 'Footer changed']
        }
    ]
    const user = useSelector((state)=> state.user)

    const cur_version = {
                            version:'1.8',
                            data : ['Mobile view updated for Sub-Categories page' , 'Recomendation system added under complete produuct' , 'on-refresh products shuffled' , 'recomendation system for Mobile updated' , 'Google OAuth added' , 'Footer changed']
                        }

    console.log(versions)
  return (
    <div style={{fontSize:"12px",color:"white"}}>
        <center>
            <b>version : 1.8. Last updated on 20-11-2024</b>
        </center>
         
        <div style={{textAlign:"left"}}>
            {
                isAdmin(user.role)&&<b>key changes</b>
            }
            {
                isAdmin(user.role)&&cur_version.data.map((item,idx)=><p>{idx+1}. {item}</p>)
            }
        </div>
    </div>
  )
}

export default Version