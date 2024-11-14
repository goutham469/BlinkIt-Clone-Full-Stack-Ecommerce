import { Router } from 'express'
import auth from '../middleware/auth.js'
import { CashOnDeliveryOrderController, deleteOrdersController, getAllOrdersController, getOrderDetailsController, OnlinePaymentOrderController, paymentController, VerifyPaymentController, webhookStripe } from '../controllers/order.controller.js'

const orderRouter = Router()

orderRouter.post("/cash-on-delivery",auth,CashOnDeliveryOrderController)
orderRouter.post('/checkout',auth,paymentController)
orderRouter.post('/webhook',webhookStripe)
orderRouter.get("/order-list",auth,getOrderDetailsController)

orderRouter.post('/create-order',auth,OnlinePaymentOrderController)
orderRouter.post('/verify-payment',VerifyPaymentController)

orderRouter.get('/all-orders',getAllOrdersController)
orderRouter.post('/deletePayment',deleteOrdersController)



export default orderRouter