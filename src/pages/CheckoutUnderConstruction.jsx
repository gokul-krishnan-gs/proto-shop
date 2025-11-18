import React from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutUnderConstruction() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md text-center border border-gray-200">

        <h1 className="text-2xl font-bold text-gray-900">
          Checkout Not Ready Yet
        </h1>

        <p className="mt-3 text-gray-600 text-base leading-relaxed">
          Our checkout system doesn’t have a backend yet.  
          We’re still building it to make payments safe and smooth.
        </p>

        <p className="mt-2 text-gray-500 text-sm">
          Thank you for understanding!
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-6 w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          Back to Products
        </button>

      </div>
    </div>
  );
}
