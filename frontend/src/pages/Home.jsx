import React from 'react'
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';


const Home = () => {
  return (
    <div className='home min-h-screen bg-black flex flex-col justify-center items-center '>
        <motion.h1 className='text-4xl md:text-6xl text-white font-bold mb-4' initial={{opacity:0,y:-20}} animate={{opacity:100,y:0}} transition={{duration:0.8}}>Build Your CRUD Magic✨</motion.h1>

        <motion.p className='text-gray-200 max-w-2xl text-md mb-7' initial={{opacity:0,y:20}} animate={{opacity:100,y:0}} transition={{delay:0.3,duration:0.8}}>Learn CRUD operations with step by step with a beautiful UI as a beginer</motion.p>
        
        <motion.div whileHover={{scale:1.1}} whileTap={{scale:1}}>
            <Link to='/app' className='text-white bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 rounded-xl font-semibold hover:shadow-2xl'>Start learning now</Link>
        </motion.div>
    </div>
  )
}   

export default Home