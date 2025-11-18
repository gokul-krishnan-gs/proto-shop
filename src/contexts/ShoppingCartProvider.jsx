import React, { useState, useEffect } from "react";
import ShoppingCartContext from "./ShoppingCartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [listOfProducts, setListOfProducts] = useState(null);
  const [productDetails,setProductDetails] = useState(null);
  const [cartItems,setCartItems]=useState([]);

  const navigate = useNavigate();

function handleaddToCart(productInfo) {
  const copyExistingCartItems = [...cartItems];
  const index = copyExistingCartItems.findIndex(
    (cartItem) => cartItem.id === productInfo.id
  );

  if (index === -1) {
    copyExistingCartItems.push({
      ...productInfo,
      quantity: 1,
      totalPrice: productInfo.price,
    });
  } else {
    const existing = copyExistingCartItems[index];

    copyExistingCartItems[index] = {
      ...existing,
      quantity: existing.quantity + 1,
      totalPrice: (existing.quantity + 1) * existing.price,
    };
  }

  setCartItems(copyExistingCartItems);
  localStorage.setItem('cartItems', JSON.stringify(copyExistingCartItems));
  navigate('/cart');
}


    
function handleRemoveFromCart(productInfo, isFullyRemoveFromCart) {
  let copyExistingCartItems = [...cartItems];
  const index = copyExistingCartItems.findIndex(
    (item) => item.id === productInfo.id
  );

  if (index === -1) return; 

  if (isFullyRemoveFromCart) {
    copyExistingCartItems.splice(index, 1);
  } else {
    const item = copyExistingCartItems[index];
    const newQty = item.quantity - 1;

    
    if (newQty <= 0) {
      copyExistingCartItems.splice(index, 1);
    } else {
      copyExistingCartItems[index] = {
        ...item,
        quantity: newQty,
        totalPrice: newQty * item.price,
      };
    }
  }

  localStorage.setItem("cartItems", JSON.stringify(copyExistingCartItems));
  setCartItems(copyExistingCartItems);
}



  useEffect(() => {
    fetchListOfProducts();
    setCartItems(JSON.parse(localStorage.getItem('cartItems')) || []);

    
  }, []);

  

  async function fetchListOfProducts() {
    setLoading(true);

    try {
      setTimeout(async () => {
        try {
          const apiResponse = await fetch("https://dummyjson.com/products");

          if (!apiResponse.ok) {
            throw new Error("Cant Fetch Data");
          }

          const data = await apiResponse.json();
          setListOfProducts(data.products);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <ShoppingCartContext.Provider
      value={{ listOfProducts, loading,setLoading,productDetails,setProductDetails,handleaddToCart,cartItems,handleRemoveFromCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
