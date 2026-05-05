import axios from "axios";
import { createContext, useContext, useState } from "react";
import Swal from 'sweetalert2'

import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  serverTimestamp,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { firebaseApp } from "./Firebase";
import { toast } from "react-toastify";

const firestore = getFirestore(firebaseApp);

export const DataContext = createContext(null);
export const getData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isAdding,setIsAdding]=useState(false)
  const[users,setUsers]=useState([])


  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((curElem) => {
      return curElem[property];
    });
    newVal = ["All", ...new Set(newVal)];
    return newVal;
  };
  const categoryOnlyData = getUniqueCategory(data, "category");
  const brandOnlyData = getUniqueCategory(data, "brand");

  // const fetchAllProducts = async () => {
  //   try {
  //     const res = await axios.get('https://dummyjson.com/products?limit=200');
  //     // const res = await axios.get('https://fakestoreapi.com/products');

  //     const productsData = res.data.products;

  //     setData(productsData);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const uploadProductsToFirestore = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=200");
      // const res = await axios.get('https://fakestoreapi.com/products');

      const productsData = res.data.products;

      await Promise.all(
        productsData.map((product) => {
          const docData = {
            title: String(product.title),
            price: Number(product.price),
            description: String(product.description),
            category: String(product.category),
            image: String(product.thumbnail),
            images: product.images || [],
            rating: Number(product.rating || 0),
            discount: Number(product.discountPercentage || 0),
            brand: product.brand || "unknown",
            stock: Number(product.stock || 0),
            tags: product.tags || [],
          };
          return addDoc(collection(firestore, "products"), docData);
        }),
      );

      console.log("✅ Products uploaded to Firestore successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllProducts = async () => {
    try {

    
      const result = await getDocs(collection(firestore,"products"))

      const allData = result.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //  console.log(allData);
      setData(allData);
    } catch (error) {
      console.log(error);
    }
  };

  
  const getSingleProduct = async (id) => {
   
    
    const docRef = doc(firestore, "products", id);
    const result = await getDoc(docRef);
   const allData= {id:result.id,...result.data()}
    return allData;
  };

  const updatePrices = async () => {
    const snapshot = await getDocs(collection(firestore, "products"));
    const updates = snapshot.docs.map((item) => {
      const data = item.data();
      const newPrice = Math.round(Number(data.price) * 50);
      const docRef = doc(firestore, "products", item.id);
      return updateDoc(docRef, {
        price: newPrice,
      });
    });
    await Promise.all(updates);
    console.log("Data Updated successfully");
  };

  const fetchProductsByCategory = async (categoryName) => {
    const productRef = collection(firestore, "products");
    const q = query(productRef, where("category", "==", categoryName));
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  };

  const addNewProduct=async(product)=>{
   setIsAdding(true)
     
    try {
        
       
        const docData = {
            title: String(product.title),
            price: Number(product.price),
            description: String(product.description),
            category: String(product.category),
            image:  product.image,
            images: product.images || [],
            rating: Number(product.rating || 0),
            discount:Number(product.discount || 0),
            brand: product.brand || "unknown",
            stock: Number(product.stock || 0),
            tags: product.tags || [],
             createdAt: serverTimestamp(),
          };
         
       const docRef=  await addDoc(collection(firestore,"products"),docData)
         setData([...data,{...docData,id:docRef.id}])
         setIsAdding(false)
         toast.success(" Product added successfully ...")
         

    } catch (error) {
      console.log("error is :" ,error);
      toast.error("Failed to add product ")
      setIsAdding(false)
      
      
    }
    


  }

  const updateProduct=async(updatedData,id)=>{

    try {
          setIsAdding(true)
    await updateDoc(doc(firestore,'products',id),updatedData)
     
  setData((prev)=>prev.map((item)=>item.id==id?{...item,...updatedData}:item) )
  toast.success('Product Updated Successfully...')
  setIsAdding(false)
 
    } catch (error) {
      setIsAdding(false)
      console.log(error);
      toast.error("Product not Updated..")
      
    }
  

  }

  const deleteProduct=async(id)=>{
    try {
     
         const result = await Swal.fire({
        title: "Are you sure?",
        text: "This product will be deleted!",
        icon: "warning",
        showCancelButton: true,
      });
          
      if (result.isConfirmed){
       await deleteDoc(doc(firestore,'products',id))

     setData((prev)=>prev.filter((item)=>item.id!==id))
      Swal.fire("Deleted!", "Product has been deleted.", "success");
      }
      
      
      

   

    
      
    } catch (error) {
      console.log("error is : ",error);
     
      Swal.fire("Error!", "Delete Failed", "error");
      
    }
  
  }

  // create collection of user in firestore

  const saveUserToFireStore = async (user) => {
    try {
      const userRef = doc(firestore, "users", user.id);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          createdAt: serverTimestamp(),
        });
        console.log("user Saved successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };


  //Fetch users
  const fetchUsers=async()=>{
    try {
          
      const result=await getDocs(collection(firestore,'users'))
          const allUsers=result.docs.map((doc)=>({
            ...doc.data(),
            id:doc.id
          }))
          setUsers(allUsers)

    } catch (error) {
        console.log("Error is ", error);
        
    }
  }

   const calculateStockStats=()=>{
   
    
    let stats={
      total:data.length,
      inStock:0,
      lowStock:0,
      outOfStock:0
    }
   
    
data.forEach((product)=>{
  if(product.stock===0){
    stats.outOfStock++
  }
  else if(product.stock<=5){
    stats.lowStock++
  }
  else {
    stats.inStock++
  }
})
return stats;
   }

   // customer stats 

   const calculateCustomerStats=(users,orders)=>{

   
    
      
    const totalCustomers=users.length;
    const totalOrders=orders.length;

    const totalRevenue=orders.reduce((sum,o)=>{
           
      return sum+(o.pricing?.subtotal||0)
                  
    },0)

     const newCustomers = users.filter((u) => {
    if (!u.createdAt) return false;

    const userDate = new Date(u.createdAt.toDate());
    const now = new Date();

    const diffInDays = (now - userDate) / (1000 * 60 * 60 * 24);
    

    return diffInDays <= 7;
  }).length;

    return{
      totalCustomers,
      totalOrders,
      totalRevenue,
      newCustomers
    }


   }


   // Get user Stats to show in customer page

   const getuserStats=(userId,orders)=>{

    const userOrders=orders.filter((o)=>o.userId===userId)

    let totalSpend=0
    userOrders.forEach(o=>{
      totalSpend+=o?.pricing?.subtotal||0
    }) 
    return{
      orders:userOrders.length,
      totalSpend,
    }

   }
   
   // Getting all store overview

   const getStoreOverview=(products,orders,customers)=>{
    
    let stats={
      totalOrders:orders.length,
      totalRevenue:0,
      totalCustomers:customers.length,
      totalProducts:products.length
    }

orders.forEach(o=>{
    
  stats.totalRevenue+=o?.pricing.subtotal

})

return stats
      

   }


  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        categoryOnlyData,
        brandOnlyData,
        uploadProductsToFirestore,
        getSingleProduct,
        updatePrices,
        fetchProductsByCategory,
        saveUserToFireStore,
        calculateStockStats,
        addNewProduct,
        isAdding,
        setIsAdding,
        updateProduct,
        deleteProduct,
        users,
        fetchUsers,
        calculateCustomerStats,
        getuserStats,
        getStoreOverview
      
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
