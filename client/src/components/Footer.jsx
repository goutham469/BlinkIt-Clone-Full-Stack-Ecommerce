import React from "react";
import './Footer.css'
import logoIcon from '../assets/logo.png'
import { FaWhatsapp } from "react-icons/fa6";
import Version from "./Version";

const Footer = () => {

  const handleWhatsAppRedirect = () => {
    const phoneNumber = '918977300290';
    const message = 'Hello, I would like to know more about your services.';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}` , "_blank")
  }; 

  return (
    <footer class="footer">
        <div class="footer-top section">
            <div class="container">
 

                <div class="footer-link-box">

                    <ul class="footer-list">

                        <li>
                            <p class="footer-list-title">Contact Us</p>
                        </li>

                        <li>
                            <address class="footer-link">
                    <ion-icon name="location"></ion-icon>

                    <span class="footer-link-text">
                        Hyderabad,Telangana,INDIA
                    </span>
                  </address>
                        </li>

                        <li>
                            <a href="tel:+918977300290" target="_blank" class="footer-link">
                                <ion-icon name="call"></ion-icon>

                                <span class="footer-link-text">+91 89773 00290</span>
                            </a>
                        </li>

                        <li>
                            <a href="mailto:attellisanjaykumar29@gmail.com" target="_blank" class="footer-link">
                                <ion-icon name="mail"></ion-icon>

                                <span class="footer-link-text">editwithsanjay@gmail.com</span>
                            </a>
                        </li>

                    </ul>

                    <ul class="footer-list">

                        <li>
                            <p class="footer-list-title">My Account</p>
                        </li>

                        <li>
                            <a href="#" class="footer-link">
                                <ion-icon name="chevron-forward-outline"></ion-icon>

                                <span class="footer-link-text">My Account</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="footer-link">
                                <ion-icon name="chevron-forward-outline"></ion-icon>

                                <span class="footer-link-text">View Cart</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="footer-link">
                                <ion-icon name="chevron-forward-outline"></ion-icon>

                                <span class="footer-link-text">My Orders</span>
                            </a>
                        </li>


                        <li>
                            <a href="#" class="footer-link">
                                <ion-icon name="chevron-forward-outline"></ion-icon>

                                <span class="footer-link-text">New Products</span>
                            </a>
                        </li>

                    </ul>

                    <div class="footer-list">

                        <p class="footer-list-title">Categories</p>

                        <table class="footer-table">
                            <tbody>
                                <li>
                                    <a href="#" class="footer-link">
                                        <ion-icon name="chevron-forward-outline"></ion-icon>

                                        <span class="footer-link-text">After Effects</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#" class="footer-link">
                                        <ion-icon name="chevron-forward-outline"></ion-icon>

                                        <span class="footer-link-text">Premiere Pro</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="footer-link">
                                        <ion-icon name="chevron-forward-outline"></ion-icon>

                                        <span class="footer-link-text">Photoshop</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#" class="footer-link">
                                        <ion-icon name="chevron-forward-outline"></ion-icon>

                                        <span class="footer-link-text">Davinci Resolve </span>
                                    </a>
                                </li>



                            </tbody>
                        </table>

                    </div>

                    <div class="footer-list">

                        <p class="footer-list-title">Whatsapp</p>

                        <p class="newsletter-text">
                            "Shop Anytime, Support Every Time – 24/7 Assistance at Your Fingertips!" </p>

                        <form action="" class="newsletter-form">
                        <button 
                          className="whatsapp-button"
                          onClick={handleWhatsAppRedirect}
                        >
                          <FaWhatsapp size={25}/>
                          <label style={{marginLeft:"10px"}}>Contact on WhatsApp</label>
                        </button>
                        </form>


                    </div>

                </div>

            </div>
        </div>

        <div class="footer-bottom">
            <div class="container">

              

                <p class="copyright">
                    &copy; 2024 <a href="#" class="copyright-link">@editwithsanjay</a>. All Rights Reserved
                </p>

                <Version/>

                


            </div>
        </div>

    </footer>
    )
};

export default Footer;




































/* ***********************************************************************************************************************************************************************************************************************************************************/
























// import React from 'react'
// import { FaBehance } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";

// import { RiShareBoxLine } from "react-icons/ri";

// import Version from './Version';

// const Footer = () => {
//   return (
//     <footer className='border-t'>
//         <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
//             <div>
                
//                 <Version/>
//             </div>

//             <div>
//                 <p
//                     style={{ fontSize: "14px", cursor: "pointer", display: "inline-flex", alignItems: "center" }}
//                     onClick={() => window.open('https://designwithsanjay.netlify.app/', '_blank')}
//                 >
//                     <b>Created By @editwithsanjay All Rights Reserved</b>
//                     <RiShareBoxLine />
//                 </p>
//                 <br/>

//                 <p
//                     style={{ fontSize: "12px", cursor: "pointer", display: "inline-flex", alignItems: "center" }}
//                     onClick={() => window.open('https://goutham469.netlify.app', '_blank')}
//                 >
//                     <b>- developed by Goutham reddy</b>
//                     <RiShareBoxLine />
//                 </p>
//             </div>


//             <div className='flex items-center gap-4 justify-center text-2xl'>
//                 <a href='https://www.behance.net/attellisanjay/' className='hover:text-primary-100'>
//                     <FaBehance/>
//                 </a>
//                 <a href='https://www.instagram.com/editwithsanjay/' className='hover:text-primary-100'>
//                     <FaInstagram/>
//                 </a>
//                 <a href='https://www.linkedin.com/in/attelli-sanjay-kumar-7073b9274/?originalSubdomain=in' className='hover:text-primary-100'>
//                     <FaLinkedin/>
//                 </a>
//             </div>
//         </div>


        



//     </footer>
//   )
// }

// export default Footer
