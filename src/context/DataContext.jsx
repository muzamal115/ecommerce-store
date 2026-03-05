import axios from "axios";
import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { collection,addDoc, getFirestore ,getDocs,getDoc,doc, updateDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASEuOda6uoxGBCD_lXJFUFOdpZeloHp2M",
  authDomain: "ecommerce-web-app-82a45.firebaseapp.com",
  projectId: "ecommerce-web-app-82a45",
  storageBucket: "ecommerce-web-app-82a45.firebasestorage.app",
  messagingSenderId: "559315569932",
  appId: "1:559315569932:web:d262a42d1b1fc4c5784d29"
};
const firebaseApp=initializeApp(firebaseConfig)
const firestore=getFirestore(firebaseApp)



export const DataContext = createContext(null);
export const getData=()=>useContext(DataContext)

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

   const getUniqueCategory=(data,property) =>{
          let newVal=data?.map((curElem)=>{
             return curElem[property]
          })
          newVal= ['All',...new Set(newVal)]
          return newVal;
          }
            const categoryOnlyData=getUniqueCategory(data,'category')
            const brandOnlyData=getUniqueCategory(data,'brand')

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

  const uploadProductsToFirestore=async()=>{
   try {
      const res = await axios.get('https://dummyjson.com/products?limit=200');
      // const res = await axios.get('https://fakestoreapi.com/products');

      const productsData = res.data.products;
    

    await Promise.all(
      productsData.map((product)=>{
        const docData={
          title:String(product.title),
          price:Number(product.price),
          description:String(product.description),
          category:String(product.category),     
         image:String(product.thumbnail),
         images: product.images|| [],
         rating:Number(product.rating || 0),
         discount: Number(product.discountPercentage || 0),
         brand:product.brand || 'unknown',
         stock:Number(product.stock || 0),
         tags:product.tags|| []
        }
        return addDoc(collection(firestore,"products"),docData)

      })
    )

    console.log("✅ Products uploaded to Firestore successfully!");

    } catch (error) {
      console.log(error);
    }

  }

  const fetchAllProducts=async()=>{
    try {
      const result=await getDocs(collection(firestore,'products'))

     const allData=   result.docs.map((doc)=>({
       id:doc.id,
       ...doc.data()
      }
      
    )  
  );
      //  console.log(allData);
       setData(allData)
       
       
    } catch (error) {
       console.log(error);
       
    }

  }
  const getSingleProduct=async(id)=>{

   const docRef=doc(firestore,'products',id)
      const result=await getDoc(docRef)
      return result
  }

  const updatePrices=async()=>{
    const snapshot=await getDocs(collection(firestore,'products'))
    const updates=snapshot.docs.map((item)=>{
      const data=item.data()
      const newPrice=Math.round(Number(data.price)*50);
      const docRef=doc(firestore,"products",item.id)
      return updateDoc(docRef,{
        price:newPrice
      })


    })
     await Promise.all(updates);
    console.log('Data Updated successfully');
    
  }

  return (
    <DataContext.Provider value={{ data,
     setData, 
     fetchAllProducts,
     categoryOnlyData,
     brandOnlyData,
     uploadProductsToFirestore,
     getSingleProduct,
     updatePrices,
      }}>
      {children}
    </DataContext.Provider>
  );
};
