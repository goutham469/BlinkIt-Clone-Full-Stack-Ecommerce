import { load } from "@cashfreepayments/cashfree-js";
import { baseURL, clientURL } from "../common/SummaryApi";

function Checkout( { payment_id } ) {
    let cashfree;
    var initializeSDK = async function () {          
        cashfree = await load({
            mode: "production"
        });
    }
    initializeSDK();

    const doPayment = async () => {
        let checkoutOptions = {
            paymentSessionId: payment_id,
            redirectTarget: `${clientURL}/cashfree/?orderId=${payment_id}`,
        };
       try{
          cashfree.checkout(checkoutOptions);

          await handlePaymentSuccess(payment_id);
       }catch(err)
       {
        alert("payment failed");
        console.log(err.message)
       }
    };

    const handlePaymentSuccess = async ( payment_id) => {
      // alert(`payment_id = ${payment_id}`)

      let verify_payment = await fetch(`${baseURL}/api/order/verify-payment`,{
                          method:"POST",
                          headers:{"Content-Type":"application/json"},
                          body:JSON.stringify({orderId:payment_id})
                        })
      
        verify_payment = await verify_payment.json()
        console.log(verify_payment)
        if(verify_payment.data.modifiedCount > 0){
            alert("transaction success.")
        }else{
            alert("unauthorized transaction.")
        }

      console.log("every thing is OK !");

    }

    return (
        <div class="row">
            <button type="submit" className="bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  id="renderBtn" onClick={doPayment}>
                Pay Now
            </button>
        </div>
    );
}
export default Checkout;