import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartContext from '../contexts/ShoppingCartContext';

export default function ProductItem({ product }) {
   const navigate = useNavigate();
  const {handleaddToCart,cartItems} = useContext(ShoppingCartContext)
  function handleNavigateToProductDetails(productID){
   
    navigate(`/product-details/${productID}`);

  }
  return (
    <div className="relative group border rounded-xl shadow-sm p-4 cursor-pointer transition hover:shadow-md">
      
     
      <div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1">
        <img 
          src={product?.thumbnail}
          alt={product?.title}
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
        />
      </div>

     
      <div className="mt-3">
        <h3 className="text-gray-900 font-semibold">{product?.title}</h3>
        <p className="text-gray-600">${product?.price}</p>
      </div>

      <button className='px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg' onClick={()=>{handleNavigateToProductDetails(product?.id)}}>View Details</button>

      <button className='disabled:opacity-65 px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg'
      onClick={()=>handleaddToCart(product)}
      disabled={cartItems?.some(item => item.id === product.id)}


      >Add to cart</button>

    </div>
  );
}
