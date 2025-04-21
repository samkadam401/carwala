import React from "react";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold text-white">CarRent</h2>
          <p className="mt-3 text-sm">
            Fast & reliable car rentals for your journeys. Drive with comfort & safety.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="/" className="hover:text-green-500 transition">Home</a></li>
            <li><a href="/cars" className="hover:text-green-500 transition">Rent a Car</a></li>
            <li><a href="/about" className="hover:text-green-500 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-green-500 transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center"><MapPin className="mr-2" /> Indore, MP, India</li>
            <li className="flex items-center"><Phone className="mr-2" /> 1234567890</li>
            <li className="flex items-center"><Mail className="mr-2" /> carwala@gmail.com</li>
          </ul>
        </div>
      </div>

    
      <div className="text-center mt-8 flex justify-center space-x-6">
        <a href="#" className="text-gray-400 hover:text-white transition"><Facebook size={24} /></a>
        <a href="#" className="text-gray-400 hover:text-white transition"><Instagram size={24} /></a>
        <a href="#" className="text-gray-400 hover:text-white transition"><Twitter size={24} /></a>
      </div>

      <p className="text-center text-gray-500 mt-6 text-sm">
        © {new Date().getFullYear()} CarRent. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
