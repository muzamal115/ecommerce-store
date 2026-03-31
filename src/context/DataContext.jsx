import axios from "axios";
import { createContext, useContext, useState } from "react";

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

      // const q=query(
      //   collection(firestore,"products"),
      //   orderBy("createdAt","desc")
      // )
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
    return result;
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
     
      
    await deleteDoc(doc(firestore,'products',id))

     setData((prev)=>prev.filter((item)=>item.id!==id))
    
      
    } catch (error) {
      console.log("error is : ",error);
      toast.error("Product failed to delete")
      
    }
  
  }

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
      
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
