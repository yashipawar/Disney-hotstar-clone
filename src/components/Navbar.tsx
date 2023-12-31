import React, { useState } from 'react'
import logo from "../images/logo1.png"
import user from "../images/user.png"
import search from "../images/search.png"
import home from "../images/home.png"
import tv from "../images/tv.png"
import movie from "../images/movie.png"
import { Fade } from "react-awesome-reveal";
import { Link } from 'react-router-dom'
import out from "../images/out.png"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/setup"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface menuProp{
    setMenu : any
    setSearch : any
    search : boolean
    searchRef : any

}

const Navbar = (props: menuProp) => {
    const [touch, setTouch] = useState(false)

    const logout = async() => {
      try{
        await signOut(auth)
        !auth.currentUser && toast.success("Logged out successfully!")
      }catch(err){
        console.log(err)
      }
      
    }


  return (
    <div className='z-20 fixed grid grid-cols-2 bg-black h-full w-28'>
      <div onMouseEnter={() => setTouch(true)} onMouseLeave={() => setTouch(false)}>
        <img src={logo} alt="logo" className='w-28 ml-5 mt-5' />
        
        <img src={search} alt="search" onClick={() => {
            setTimeout(() => {
                props.searchRef?.current?.focus()
            }, 1)
            
            props.setSearch(!props.search)}} className='w-9 ml-7 mt-8 cursor-pointer'/>
        <img src={home} alt="home" onClick={() => {
            props.setSearch(false)
            props.setMenu("home")
        }} 
        className='w-9 ml-7 mt-8 cursor-pointer'/>
        <img src={tv} alt="tv" onClick={() => {
            props.setSearch(false)
            props.setMenu("tv")
         }} 
            className='w-16 ml-5 mt-8 cursor-pointer'/>
        <img src={movie} alt="movie" onClick={() => {
            props.setSearch(false)
            props.setMenu("movie")
        }} 
            className='w-16 ml-5 mt-8 cursor-pointer'/>
            {!auth.currentUser && <Link to="/signin"><img src={user} alt="user" className='w-5 ml-9 mt-8 cursor-pointer' /></Link>}
            {auth.currentUser && <img onClick={logout} src={out} alt="logout" className="w-16 ml-5 mt-8 cursor-pointer" />}
      </div>
      {touch && <Fade><div className=' bg-opacity-60 z-20 ml-8 w-20 bg-black h-screen font-bold text-base text-slate-300'>
        
        <h4 className='pt-20 mt-6'>Search</h4>
        <h4 className='mt-11'>Home</h4>
        <h4 className='mt-11'>TV</h4>
        <h4 className='mt-9'>Movie</h4>
        {!auth.currentUser && <h4 className='mt-9'>Signin</h4>}
        {auth.currentUser && <h4 className='mt-9'>SignOut</h4>}
        
      </div> 
    </Fade>}
    </div>
  )
}

export default Navbar
