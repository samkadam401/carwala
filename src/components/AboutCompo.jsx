import React from "react";
import aboutComp from "../assets/aboutComp.jpeg";

const AboutCompo = () => {
  return (
    <section className="w-full bg-black text-white py-20 px-4 md:px-16">
    <div className="max-w-6xl mx-auto">
   
      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-center uppercase tracking-wide">
        About <span className="text-green-500">Carwala</span>
      </h2>

      <p className="text-center text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
        Carwala is more than just a car rental service — it's your trusted
        travel companion. Whether you're planning a weekend escape or a
        business trip, we’ve got a ride tailored to your needs. Premium cars.
        Instant booking. Zero stress.
      </p>

    
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        {[
          {
            title: "Our Mission",
            text: "To make car rentals faster, smoother, and more reliable for everyone — from city explorers to road trippers.",
          },
          {
            title: "Our Fleet",
            text: "Choose from a wide range of well-maintained vehicles – SUVs, Sedans, Hatchbacks & more, ready for any journey.",
          },
          {
            title: "Why Us",
            text: "24/7 support, transparent pricing, flexible booking & a tech-powered platform built for your comfort.",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-[#1a1a1a] rounded-xl shadow-[0_0_15px_2px_rgba(255,255,255,0.05)] p-6 text-center hover:shadow-green-500/20 hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold mb-3 text-green-500">
              {card.title}
            </h3>
            <p className="text-gray-400">{card.text}</p>
          </div>
        ))}
      </div>

     
    </div>
  </section>

  );
};

export default AboutCompo;
