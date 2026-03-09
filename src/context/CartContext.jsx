import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { collection,addDoc, getFirestore ,getDocs,getDoc,doc, updateDoc, query, where, setDoc, serverTimestamp, deleteDoc} from "firebase/firestore";
import { firebaseApp } from "./Firebase";
import { useUser } from "@clerk/clerk-react";




const firestore=getFirestore(firebaseApp)


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const{user}=useUser()
  const [cartItem, setCartItem] = useState([]);


  // -------------------------
  // Add To Cart Function
  // -------------------------
  const addToCart = async(product) => {
    if(!user) {
      toast.error("Please login first")
      return;
    }
    const itemInCart = cartItem.find((item) => item.id === product.id);
    try {
      const itemRef=doc(firestore,'users',user.id,'cart',product.id)

      if (itemInCart) {
      const updatedCart = cartItem.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCartItem(updatedCart);
      await updateDoc(itemRef,{quantity:itemInCart.quantity+1})
      toast.success("Quantity increased")
    } else {
        // Add new Product
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      await setDoc(itemRef, { ...product,  quantity: 1 })
      toast.success("Item added successfully")
    }
      
    } catch (error) {
      
    }

    
  };

  // -------------------------
  // Update Quantity Function
  // -------------------------
  const updateQuantity = async(productId, action) => {
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

    try {
      const itemRef=doc(firestore,'users',user.id,'cart',productId)
      const itemInCart=updated.find((item)=>item.id===productId)
      if(itemInCart){
        await updateDoc(itemRef,{quantity:itemInCart.quantity})
      }
      else{
        await deleteDoc(itemRef)
      }

      
    } catch (error) {
      
    }
  };
   
  // delete item
    const deleteItem = async (productId) => {
    setCartItem(cartItem.filter((item) => item.id !== productId));
    try {
      const itemRef = doc(firestore, "users", user.id, "cart", productId);
      await deleteDoc(itemRef);
      toast.success("Product deleted from cart");
    } catch (error) {
      console.log("Error deleting cart item:", error);
    }
  };

  
  const fetchCart=async()=>{
   if(!user) return
   try {
    const cartRef=collection(firestore,'users',user.id,'cart')
    const snapshot=await getDocs(cartRef)
    const items=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}))
    setCartItem(items)
   } catch (error) {
    console.log("Error fetching cart:", error);
    
    
   }
  }

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        addToCart,
        updateQuantity,
        deleteItem,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
