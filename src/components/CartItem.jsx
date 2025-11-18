import React from 'react'
import { useContext } from 'react';
import ShoppingCartContext from '../contexts/ShoppingCartContext';

export default function CartItem({ singleCartItem }) {
  const {handleRemoveFromCart,handleaddToCart} = useContext(ShoppingCartContext)
  return (
    <>
    <hr />
    <div className="grid grid-cols-3 items-start gap-5 border-b pb-5 mb-5">
      
      {/* Left Section */}
      <div className="col-span-2 flex items-start gap-4">

        {/* Product Image */}
        <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-100 border rounded-md p-2 flex items-center justify-center">
          <img 
            src={singleCartItem.thumbnail}
            className="w-full h-full object-contain"
            alt={singleCartItem.title}
          />
        </div>

        {/* Title + Remove */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {singleCartItem.title}
          </h3>

          <button className="text-xs w-fit px-3 py-1.5 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
            onClick={()=>handleRemoveFromCart(singleCartItem,true)}
          >
            Remove
          </button>
        </div>

      </div>

      {/* Price */}
      <div className="ml-auto text-right">
        <h3 className="text-xl font-bold text-gray-900">
          ${singleCartItem?.totalPrice.toFixed(2)}
        </h3>
        <p className='mt-2 mb-3 font-bold text-[16px]'>Quantity: {singleCartItem.quantity}</p>
             <div className="flex items-center gap-3">
                <button className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-md hover:bg-black transition disabled:opacity-65"
                disabled={singleCartItem?.quantity === 1}
                onClick={()=>handleRemoveFromCart(singleCartItem,false)}
                >
                    -
                </button>

                <button className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-md hover:bg-black transition"
                onClick={()=>handleaddToCart(singleCartItem)}
                >
                    +
                </button>
            </div>
      </div>

    </div>  
    </>

  );
}
