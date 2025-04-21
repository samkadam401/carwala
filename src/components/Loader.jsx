import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
    <div className="relative w-40 h-40">
     
      <img
        src="https://atlas-content-cdn.pixelsquid.com/stock-images/toy-car-4o74NQD-600.jpg" 
        alt="Porsche Car"
        className="absolute top-0 left-0 w-full h-full object-contain rounded-full car-loader"
      />
    </div>
    <style jsx>{`
      @keyframes rotateCar {
        0% {
          transform: rotateY(0deg);
        }
        100% {
          transform: rotateY(360deg);
        }
      }

      .car-loader {
        animation: rotateCar 3s infinite linear;
      }
    `}</style>
  </div>
  );
};

export default Loader;
