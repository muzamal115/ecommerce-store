
import { createContext, useContext, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItem, setCartItem] = useState([]);
  const addToCart=(product)=>{
      setCartItem([...cartItem,product])
      console.log(cartItem);
      
  }

   
  return (
    <CartContext.Provider value={{cartItem,setCartItem,addToCart}}>
      {children}
    </CartContext.Provider>
  );
};
 export const useCart= ()=>useContext(CartContext)