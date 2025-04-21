import React, { useEffect } from 'react'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react";

const Contact = () => {
    
   
  return (
    <section className="w-full bg-black text-white py-20 px-4 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 uppercase tracking-wide">
          Contact <span className="text-green-500">Us</span>
        </h2>

        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Have a question, suggestion or need support? Reach out to us and
          we’ll get back to you as soon as possible. Our team is available 24/7
          to assist you!
        </p>

        {/* Contact Form */}
        <form className="bg-[#1a1a1a] p-8 rounded-xl shadow-[0_0_20px_rgba(0,255,100,0.05)]">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-[#0f0f0f] text-white p-4 rounded outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-[#0f0f0f] text-white p-4 rounded outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full bg-[#0f0f0f] text-white p-4 rounded outline-none focus:ring-2 focus:ring-green-500 mb-6"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition w-full"
          >
            Send Message
          </button>
        </form>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 text-center mt-16">
          {[
            {
              icon: "📍",
              title: "Address",
              detail: "Indore, India",
            },
            {
              icon: "📞",
              title: "Phone",
              detail: "1234567890",
            },
            {
              icon: "📧",
              title: "Email",
              detail: "support@carwala.com",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#141414] p-6 rounded-lg hover:shadow-green-500/20 transition"
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <h4 className="font-bold text-green-500 text-lg mb-1">
                {item.title}
              </h4>
              <p className="text-gray-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
