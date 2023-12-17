import React, { useState } from 'react'
import signin from "../images/signin.jpg"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from "../firebase/setup"
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Signin = () => {

    const navigate = useNavigate()

    const [phone, setPhone] = useState("");
    const [user,setUser] = useState<any>(null);
    const [otp, setOtp] = useState("")

    const sendOtp = async() => {
        try{
            const recaptcha = new RecaptchaVerifier(auth,"recaptcha",{})
            const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
            setUser(confirmation)
        }catch(err){
            console.error(err)
        }
    }

    const verifyOtp = async() => {
        try{
            await user.confirm(otp)
            auth.currentUser && toast.success("Log in successfully!")
            navigate("/")
        }catch(err){
            console.error(err)
        }
      
    }

  return (
    <div className='grid grid-cols-2 h-screen bg-black'>
       <div style={{backgroundImage: `linear-gradient(to left, rgba(0, 0,0,7), rgba(0, 0, 0, 0.1)), url(${signin})`}}>

       </div>
       <div className='ml-36'>
        <h1 className='mt-24 text-xl mb-2 font-semibold text-white'>
            Log in or Sign up to continue
        </h1>
        <PhoneInput
            country={'us'}
            value={phone}
            onChange={phone => setPhone( "+" + phone )}
            inputStyle={{backgroundColor: "black", color: "white"}}
            placeholder='Enter mobile number'
        />
        <h6 className=' text-gray-500 text-xs mt-3'>By proceeding you confirm that you are above 18 years <br /> of age and agree to the privacy policy and terms of use</h6>
        {phone && <button onClick={sendOtp} type="button" className="mt-10 h-12 text-white bg-gradient-to-r w-72 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Get OTP 
        </button>}
        <div id='recaptcha' className='mt-2'>

        </div>
        {phone && <input onChange={(e)=> setOtp(e.target.value)} type="text" className="bg-black border border-gray-300 mt-10 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Otp" required/> }
        {otp && <button onClick={verifyOtp} type="button" className="mt-10  text-white bg-gradient-to-r w-72 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Verify OTP 
        </button>}
        
        {otp && <h3 className='text-slate-500 ml-3 mt-3'>Enter code, number and <span className='text-blue-500 '> click Get OTP </span></h3>}
       </div>
    </div>
  )
}

export default Signin
