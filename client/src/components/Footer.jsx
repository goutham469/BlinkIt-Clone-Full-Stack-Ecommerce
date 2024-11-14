import React from 'react'
import { FaBehance } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import { RiShareBoxLine } from "react-icons/ri";

import Version from './Version';

const Footer = () => {
  return (
    <footer className='border-t'>
        <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
            <div>
                
                <Version/>
            </div>

            <div>
                <p
                    style={{ fontSize: "14px", cursor: "pointer", display: "inline-flex", alignItems: "center" }}
                    onClick={() => window.open('https://goutham469.netlify.app', '_blank')}
                >
                    <b>Created By @editwithsanjay All Rights Reserved</b>
                    <RiShareBoxLine />
                </p>
                <br/>

                <p
                    style={{ fontSize: "12px", cursor: "pointer", display: "inline-flex", alignItems: "center" }}
                    onClick={() => window.open('https://goutham469.netlify.app', '_blank')}
                >
                    <b>- developed by Goutham reddy</b>
                    <RiShareBoxLine />
                </p>
            </div>


            <div className='flex items-center gap-4 justify-center text-2xl'>
                <a href='https://www.behance.net/attellisanjay/' className='hover:text-primary-100'>
                    <FaBehance/>
                </a>
                <a href='https://www.instagram.com/editwithsanjay/' className='hover:text-primary-100'>
                    <FaInstagram/>
                </a>
                <a href='https://www.linkedin.com/in/attelli-sanjay-kumar-7073b9274/?originalSubdomain=in' className='hover:text-primary-100'>
                    <FaLinkedin/>
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
