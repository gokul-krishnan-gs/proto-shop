import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ShoppingCartContext from '../contexts/ShoppingCartContext'
import ProductItem from '../components/ProductItem';
import Spinner from '../components/Spinner';

export default function ProductList() {
  const { loading, listOfProducts, cartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  if (loading) return <Spinner />;

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className='px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl' >
        
        <h1 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-2">
          ProtoShop
        </h1>

       
        <p className="text-center text-gray-600 mb-10">
          A frontend-only shopping experience prototype
        </p>
        
        <div className='max-w-md mx-auto text-center'>
          <h2 className='text-3xl font-bold text-gray-950 sm:text-4xl'>Our Featured Products</h2>

          <button 
            onClick={() => navigate('/cart')}
            disabled={cartItems.length === 0}
            className="mt-5 px-6 py-2 bg-black text-white rounded-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition"
          >
            My Cart
          </button>
        </div>

        <div className='grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4'>
          {
            listOfProducts?.length > 0 ?
              listOfProducts.map((singleProductItem) => {
                return <ProductItem key={singleProductItem.id} product={singleProductItem} />
              })
              :
              <h3>No Products present</h3>
          }
        </div>
      </div>
    </section>
  );
}
