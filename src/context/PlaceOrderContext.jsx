import { doc, getFirestore, serverTimestamp, setDoc, collection, deleteDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { firebaseApp } from "./Firebase";
import { useCart } from "./CartContext";
import { toast } from "react-toastify";

export const PlaceOrderContext = createContext();
const firestore = getFirestore(firebaseApp);



export const PlaceOrderProvider = ({ children }) => {
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [orderId,setOrderId]=useState()
  const {setCartItems}=useCart()

  const placeOrder = async (user, cartItems, userFormData, pricing, paymentMethod) => {
  if (!user || cartItems.length === 0) return;

  try {
    const orderRef = doc(collection(firestore, 'users', user.id, 'orders'));

    const orderData = {
      orderItems: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      userInfo: {
        name: userFormData.name,
        email: userFormData.email,
        address: userFormData.address,
        phone: userFormData.phoneNumber,
        city: userFormData.city,
        

      },
      pricing: {
        subtotal: pricing.subtotal,
        shipping: pricing.shipping,
        total: pricing.total
      },
      status: 'placed',
      paymentMethod: paymentMethod,
      createdAt: serverTimestamp()
    };

    // Save to Firestore
    await setDoc(orderRef, orderData);
    setOrderId(orderRef.id)
   

    const cartRef=collection(firestore,'users',user.id,'cart');
    for(const item of cartItems){
      const itemRef=doc(cartRef,item.id)
      await deleteDoc(itemRef)
    }
    setCartItems([])
    console.log("Cart is clear");
    
 setShowSuccessCard(true)

  } catch (error) {
    console.log("Error placing order:", error);
    toast.error("Failed to place order");

  }
};

  return (
    <PlaceOrderContext.Provider value={{ showSuccessCard, setShowSuccessCard ,placeOrder,orderId}}>
      {children}
    </PlaceOrderContext.Provider>
  );
};

export const usePlaceOrder = () => useContext(PlaceOrderContext);