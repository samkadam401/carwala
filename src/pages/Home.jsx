import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import SearchCar from '../components/SearchCar'
import Cars from '../components/Cars'
import AboutCompo from '../components/AboutCompo'
import ServicePage from './ServicePage'

const Home = () => {
 
  return (
    <div className="min-h-screen bg-black text-white pb-10">
       <Hero/>
      <SearchCar/>
      <Cars/>
      <AboutCompo/>
      <ServicePage/>
    </div>
  )
}

export default Home
