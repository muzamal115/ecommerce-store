import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  // -------------------------
  // Add To Cart Function
  // -------------------------
  const addToCart = (product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);

    if (itemInCart) {
      const updatedCart = cartItem.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCartItem(updatedCart);
      toast.success("Quantity increased")
    } else {
      
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Item added successfully")
    }
  };

  // -------------------------
  // Update Quantity Function
  // -------------------------
  const updateQuantity = (productId, action) => {
    const updated = cartItem
      .map((item) => {
        if (item.id === productId) {
          // console.log(item);
          
          let newUnit = item.quantity;
          

          if (action === "decrease") {
            newUnit=newUnit-1
          
          };
          if (action === "increase"){
             newUnit=newUnit+1;
              
          } 
         

          if (newUnit <= 0) return null; // remove item
          return { ...item, quantity: newUnit };
        }
      //  console.log((item));
       
        return item; // important
      })
      .filter((item) => item !== null); // remove null

    setCartItem(updated);
  };
   
  // delete item
   const deleteItem=(productId)=>{
       setCartItem(cartItem.filter(item=>item.id!=productId))
       toast.success("Product deleted from cart")

   }

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        addToCart,
        updateQuantity,
        deleteItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
