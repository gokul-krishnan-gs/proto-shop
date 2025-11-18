import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShoppingCartContext from '../contexts/ShoppingCartContext';
import Spinner from '../components/Spinner';

export default function ProductDetails() {
  const { id } = useParams();
  const { loading, setLoading, productDetails, setProductDetails, handleaddToCart, cartItems } = useContext(ShoppingCartContext);


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const apResponse = await fetch(`https://dummyjson.com/products/${id}`);
        if (!apResponse.ok) {
          throw new Error('Cant fetch product details');
        }
        const data = await apResponse.json();
        setProductDetails(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, setLoading, setProductDetails]);


  if(loading) return <Spinner />;

return (
  <div className="py-10 bg-gray-50 min-h-screen">
    <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-white rounded-2xl shadow-xl p-6">
        
       
        <div className="lg:col-span-3 w-full lg:sticky top-10 text-center">
          <div className="px-4 py-10 rounded-xl shadow-md bg-white">
            
            
            <img 
              className="w-full max-w-md mx-auto rounded-xl object-cover shadow-sm transition-transform duration-300 hover:scale-105"
              src={productDetails?.thumbnail}
              alt={productDetails?.title}
            />

            
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {productDetails?.images?.length > 0 &&
                productDetails.images.map((img) => (
                  <div
                    key={img}
                    className="rounded-xl p-2 shadow-sm border border-gray-200 hover:border-black hover:shadow-lg transition cursor-pointer bg-white"
                  >
                    <img
                      className="w-20 h-20 rounded object-cover"
                      src={img}
                      alt="product preview" 
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>

       
        <div className="lg:col-span-2 p-4 flex flex-col justify-start">
          <h1 className="text-3xl font-bold text-gray-900">{productDetails?.title}</h1>
          <p className="text-gray-500 mt-2">{productDetails?.description}</p>

          <div className="mt-6">
            <p className="text-4xl font-extrabold text-green-600">
              ${productDetails?.price}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Discount: <span className="font-semibold text-orange-500">{productDetails?.discountPercentage}% OFF</span>
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-yellow-400 text-xl">⭐</span>
            <p className="text-lg font-medium">{productDetails?.rating}</p>
          </div>

          <button 
          
          className="mt-8 bg-black text-white text-lg py-3 rounded-xl hover:bg-gray-800 transition shadow-md active:scale-95 disabled:opacity-65"
          onClick={()=>handleaddToCart(productDetails)}
          disabled={cartItems?.some(item => item.id === Number(productDetails?.id))}
          >
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  </div>
);

}
