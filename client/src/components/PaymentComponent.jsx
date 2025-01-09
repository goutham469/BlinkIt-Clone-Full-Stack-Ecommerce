import { load } from "@cashfreepayments/cashfree-js";
import { clientURL } from "../common/SummaryApi";

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
            redirectTarget: clientURL,
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
      alert(`payment_id = ${payment_id}`)
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