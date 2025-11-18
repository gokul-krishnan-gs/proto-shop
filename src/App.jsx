import { Routes,Route,Navigate } from 'react-router-dom';
import './App.css'
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import CartList from './pages/CartList';
import CheckoutUnderConstruction from './pages/CheckoutUnderConstruction';

function App() {
    return (
      <>
      <Routes>

       <Route path="/" element={<Navigate to="/products" />} />
        <Route 
          path='/products' 
          element={<ProductList />} 
        />
        <Route 
          path='/product-details/:id' 
          element={<ProductDetails />} 
        />
        <Route 
          path='/cart' 
          element={<CartList />} 
        />
        <Route 
          path='/checkout'
          element={<CheckoutUnderConstruction />} 
        />
      </Routes>
      </>
    )


}
export default App;
