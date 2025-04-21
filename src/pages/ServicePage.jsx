import { Building, Building2, Luggage, MapPin, Plane,BellRing as Ring } from 'lucide-react'
import React from 'react'

const ServicePage = () => {
  return (
   <>
  <div className='p-15 bg-black'>
      {/* Stats / Graph-Like Info Panel */}
      <div className="mt-20 ">
        <h3 className="text-3xl font-bold text-center text-white mb-10 uppercase">
          Performance <span className="text-green-500">Stats</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "500+", label: "Total Cars" },
            { stat: "1.2K", label: "Daily Rentals" },
            { stat: "98%", label: "Customer Satisfaction" },
            { stat: "24/7", label: "Support" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#141414] rounded-lg p-6 shadow-lg hover:shadow-green-500/20 transition"
            >
              <h4 className="text-2xl font-bold text-green-500">{item.stat}</h4>
              <p className="text-sm text-gray-400 mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-20">
        <h3 className="text-3xl font-bold text-center mb-12 uppercase">
          What <span className="text-green-500">Customers Say</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              name: "Aman Verma",
              text: "Absolutely loved the service! Carwala made my road trip smooth and affordable. Will book again!",
            },
            {
              name: "Sneha Kapoor",
              text: "Best car rental experience ever. Customer support was super helpful and the car was in great condition.",
            },
          ].map((review, idx) => (
            <div
              key={idx}
              className="bg-[#1c1c1c] p-6 rounded-xl shadow-md hover:shadow-green-500/20 transition"
            >
              <p className="italic text-gray-300 mb-4">"{review.text}"</p>
              <h4 className="font-semibold text-green-500 text-right">
                — {review.name}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-20">
        <h4 className="text-2xl font-bold mb-4">Ready to ride?</h4>
        <p className="text-gray-400 mb-6">
          Browse our fleet and book your car in seconds.
        </p>
        <a
          href="/cars"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Explore Cars
        </a>
      </div>
  </div>
  </>
  )
}

export default ServicePage
