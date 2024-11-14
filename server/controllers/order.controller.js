import Stripe from "../config/stripe.js";
import CartProductModel from "../models/cartproduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";
import Razorpay from "razorpay";

 export async function CashOnDeliveryOrderController(request,response){

    try {
        const userId = request.userId // auth middleware 
        const { list_items, totalAmt, addressId,subTotalAmt } = request.body 

        const payload = list_items.map(el => {
            return({
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : el.productId._id, 
                product_details : {
                    name : el.productId.name,
                    image : el.productId.image,
                    more_details : el.productId.more_details
                } ,
                paymentId : "",
                payment_status : "CASH ON DELIVERY",
                delivery_address : addressId ,
                subTotalAmt  : subTotalAmt,
                totalAmt  :  totalAmt,
            })
        })

        const generatedOrder = await OrderModel.insertMany(payload)

        ///remove from the cart
        const removeCartItems = await CartProductModel.deleteMany({ userId : userId })
        const updateInUser = await UserModel.updateOne({ _id : userId }, { shopping_cart : []})

        return response.json({
            message : "Order successfully",
            error : false,
            success : true,
            data : generatedOrder
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error ,
            error : true,
            success : false
        })
    }
}



// Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create an order with Razorpay and store in the database
export async function OnlinePaymentOrderController(req, res) {

    console.log("new payment came : ")
    console.log(req.body)
  try {
    const userId = req.userId; // authenticated user ID
    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

    console.log("userId created by auth middleware : ",userId)

    // Create a Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmt * 100, // amount in smallest currency unit (paisa)
      currency: "INR",
      receipt: `receipt_order_${new mongoose.Types.ObjectId()}`,
      notes: {
        userId: userId,
      },
    });

    // Prepare payload for MongoDB
    const payload = list_items.map((el) => ({
      userId: userId,
      orderId: razorpayOrder.id,
      productId: el.productId._id,
      product_details: {
        name: el.productId.name,
        image: el.productId.image,
        more_details: el.productId.more_details
      },
      paymentId: "", // Will update after successful payment
      payment_status: "PENDING",
      delivery_address: addressId,
      subTotalAmt: subTotalAmt,
      totalAmt: totalAmt,
    }));

    console.log("payload to insert into DB : ",)

    const generatedOrder = await OrderModel.insertMany(payload);

    ///remove from the cart
    const removeCartItems = await CartProductModel.deleteMany({ userId : userId })
    const updateInUser = await UserModel.updateOne({ _id : userId }, { shopping_cart : []})

    return res.json({
      message: "Order initiated",
      error: false,
      success: true,
      orderId: razorpayOrder.id, // Send this to frontend
      data: generatedOrder
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

// Verify Razorpay payment and update order
export async function VerifyPaymentController(req, res) {
  try {
    console.log("new payment verification came : ",req.body)

    const { razorpay_payment_id, orderId, razorpay_signature } = req.body;

    // Validate signature (additional code for signature validation required here)

    // Update order details in DB upon successful payment
    const updatedOrder = await OrderModel.updateMany(
      { orderId: orderId },
      {
        paymentId: orderId,
        payment_status: "PAID"
      }
    );

    return res.json({
      message: "Payment successful",
      error: false,
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}







export const pricewithDiscount = (price,dis = 1)=>{
    const discountAmout = Math.ceil((Number(price) * Number(dis)) / 100)
    const actualPrice = Number(price) - Number(discountAmout)
    return actualPrice
}

export async function paymentController(request,response){
    try {
        const userId = request.userId // auth middleware 
        const { list_items, totalAmt, addressId,subTotalAmt } = request.body 

        const user = await UserModel.findById(userId)

        const line_items  = list_items.map(item =>{
            return{
               price_data : {
                    currency : 'inr',
                    product_data : {
                        name : item.productId.name,
                        images : item.productId.image,
                        more_details : item.productId.more_details,
                        metadata : {
                            productId : item.productId._id
                        },

                    },
                    unit_amount : pricewithDiscount(item.productId.price,item.productId.discount) * 100   
               },
               adjustable_quantity : {
                    enabled : true,
                    minimum : 1
               },
               quantity : item.quantity 
            }
        })

        const params = {
            submit_type : 'pay',
            mode : 'payment',
            payment_method_types : ['card'],
            customer_email : user.email,
            metadata : {
                userId : userId,
                addressId : addressId
            },
            line_items : line_items,
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`

        }

        const session = await Stripe.checkout.sessions.create(params)

        return response.status(200).json(session)

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


const getOrderProductItems = async({
    lineItems,
    userId,
    addressId,
    paymentId,
    payment_status,
 })=>{
    const productList = []

    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product = await Stripe.products.retrieve(item.price.product)

            const paylod = {
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : product.metadata.productId, 
                product_details : {
                    name : product.name,
                    image : product.images,

                } ,
                paymentId : paymentId,
                payment_status : payment_status,
                delivery_address : addressId,
                subTotalAmt  : Number(item.amount_total / 100),
                totalAmt  :  Number(item.amount_total / 100),
            }

            productList.push(paylod)
        }
    }

    return productList
}

//http://localhost:8080/api/order/webhook
export async function webhookStripe(request,response){
    const event = request.body;
    const endPointSecret = process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY

    console.log("event",event)

    // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const lineItems = await Stripe.checkout.sessions.listLineItems(session.id)
      const userId = session.metadata.userId
      const orderProduct = await getOrderProductItems(
        {
            lineItems : lineItems,
            userId : userId,
            addressId : session.metadata.addressId,
            paymentId  : session.payment_intent,
            payment_status : session.payment_status,
        })
    
      const order = await OrderModel.insertMany(orderProduct)

        console.log(order)
        if(Boolean(order[0])){
            const removeCartItems = await  UserModel.findByIdAndUpdate(userId,{
                shopping_cart : []
            })
            const removeCartProductDB = await CartProductModel.deleteMany({ userId : userId})
        }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
}


export async function getOrderDetailsController(request,response){
    try {
        const userId = request.userId // order id

        const orderlist = await OrderModel.find({ userId : userId }).sort({ createdAt : -1 }).populate('delivery_address')

        return response.json({
            message : "order list",
            data : orderlist,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function getAllOrdersController(request,response){
  try {

      const orderlist = await OrderModel.find().sort({ createdAt : -1 })

      return response.json({
          message : "orders list",
          data : orderlist,
          error : false,
          success : true
      })
  } catch (error) {
      return response.status(500).json({
          message : error.message || error,
          error : true,
          success : false
      })
  }
}

export async function deleteOrdersController(request,response){
  try {

      const orderlist = await OrderModel.deleteMany({paymentId : request.body.paymentId})
      console.log("an order deleted ","paymentId = ",request.body.paymentId,"status : ",orderlist)

      return response.json({
          message : "deleted",
          data : orderlist,
          error : false,
          success : true
      })
  } catch (error) {
      return response.status(500).json({
          message : error.message || error,
          error : true,
          success : false
      })
  }
}

