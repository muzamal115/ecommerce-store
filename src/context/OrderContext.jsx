import { doc, getFirestore, serverTimestamp, setDoc, collection, deleteDoc, getDocs, query, orderBy, updateDoc, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseApp } from "./Firebase";
import { useCart } from "./CartContext";
import { toast } from "react-toastify";

export const OrderContext = createContext();
const firestore = getFirestore(firebaseApp);

export const OrderProvider = ({ children }) => {
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [orderId,setOrderId]=useState()
  const[orders,setOrders]=useState([])
  const [ordersData,setOrdersData]=useState([])
  const {setCartItems}=useCart()

function generateOrderID() {
  const date = new Date();
  const yyyy = date.getFullYear().toString();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 7).toUpperCase(); // 5 chars
  return `ORD-${yyyy}${mm}${dd}-${random}`;
}



  //  Put orders data

  const placeOrder = async (user, cartItems, userFormData, pricing, paymentMethod) => {
  if (!user || cartItems.length === 0) return;

  try {
    
    const orderRef = doc(collection(firestore, 'orders'));
     const order_id= generateOrderID()
       
    const orderData = {

         orderId:order_id,
         userId:user.id,
      orderItems: cartItems.map((item) => ({
        productId: item.id,
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
  
    console.log(orderData);
   
    
    // Save to Firestore
    await setDoc(orderRef, orderData);
    setOrders(prev => [orderData, ...prev])
    setOrderId(order_id)
   

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
  // fetch user order data
const fetchOrderData=async(user)=>{
  if(!user) return
 try {
   const orderRef = collection(firestore,'orders');
   const q=query(orderRef,where("userId","==",user.id))
   const snapshot=await getDocs(q)
 const items=snapshot.docs.map((doc)=>{
   const data=doc.data()
  return{
   id:doc.id,
   ...data,  createdAt: data.createdAt ? data.createdAt.toDate() : null

 }})
   

  
   
   setOrders(items)
  
 } catch (error) {
   console.log("fetching Orders Data :",error);
   
 }
}

// Fetch Admin Orders Data

const fetchAllOrders=async()=>{
 
  try {


       const q=query(collection(firestore,'orders'),
                orderBy('createdAt','desc'))
    const result=await getDocs(q)

   
 const allData=result.docs.map((doc)=>{
   const data=doc.data()
  return{
   id:doc.id,
   ...data,  createdAt: data.createdAt ? data.createdAt.toDate() : null

 }})

 

 setOrdersData(allData)
 
 

    

  } catch (error) {
     console.log("Error is ", error);
     
  }

}
  
// Calculate All order states placed → processing → shipped → delivered ->   cancelled

 const calculateOrderStats=(orderData)=>{
       
       
 let stats={
  totalOrders:orderData?.length,
  placed:0,
  pending:0,
  shipped:0,
  delivered:0,
  failed:0
 }

 orderData?.forEach((data)=>{
  if(data.status=='placed'){
    stats.pending++
  }
  
   else if(data.status=='shipped'){
    stats.shipped++
  }

  else if(data.status=='delivered'){
    stats.delivered++
  }
  else{
    stats.failed++
  }
  
  
 })

 return stats

 }

//  update status

const updateStatus=async(orderId,newStatus)=>{
   
   

  try {
     const ref=doc(firestore,'orders',orderId)

    await  updateDoc(ref,{
    status:newStatus
      }

          
           
      )
        // setOrdersData((prev)=>prev.map((item)=>orderId= item.id?{...item,status:newStatus}:item))
     

      toast.success("Status changed successfully!")
    
  } catch (error) {
      console.log("Error is ", error);
      toast.error("Status not be changed!")
      
  }

    
   


}
        
      


  return (
    <OrderContext.Provider value={
      { showSuccessCard,
         setShowSuccessCard ,
         placeOrder,
         orderId,orders,
         fetchOrderData,
         fetchAllOrders,
         ordersData,
         calculateOrderStats,
         updateStatus
         
        }
      }>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrdersData = () => useContext(OrderContext);