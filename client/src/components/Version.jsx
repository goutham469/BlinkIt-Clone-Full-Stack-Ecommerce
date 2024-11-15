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
        }
    ]
    const user = useSelector((state)=> state.user)

    const cur_version = {
                            version:'1.6',
                            data:['RZP , multiple payments will be accepted !, change made only on backend' , 'index.html icons added' , 'chat bot integrated' , 'Cart side delivery time removed' , 'add and remove to cart , icons added']
                        }

    console.log(versions)
  return (
    <div style={{fontSize:"13px"}}>
        <b>version : 1.3 . Last updated on: 14-11-2024</b>
        <br/>
        <br/>
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