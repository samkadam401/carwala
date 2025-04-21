import React from 'react'
import heroImg from '../assets/car2.jpg'

const Hero = () => {
  return (
    <div className="relative h-[600px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 "
          style={{
            backgroundImage:` url(${heroImg})`,
            filter: 'brightness(0.4)'
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center flex-col justify-center h-full text-white relative z-10 ">
            <h1 className="md:text-7xl text-4xl text-center font-bold mb-6 ">"Smart Rentals for Smart Drivers"</h1>
            <p className=' md:text-xl text-lg text-center'>Choose your perfect ride, book in seconds, and hit the road without any hassle. Our smart car rental app makes renting a car quick, easy, and totally stress-free. Whether it's a short trip or a long drive – we’ve got the perfect vehicle to match your journey.

</p>
            
          </div>
        </div>
      </div>
  )
}

export default Hero
