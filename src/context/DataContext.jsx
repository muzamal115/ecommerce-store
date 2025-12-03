import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

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

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get('https://dummyjson.com/products?limit=200');
      // const res = await axios.get('https://fakestoreapi.com/products');

      const productsData = res.data.products;
      setData(productsData);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DataContext.Provider value={{ data, setData, fetchAllProducts,categoryOnlyData,brandOnlyData }}>
      {children}
    </DataContext.Provider>
  );
};
export const getData=()=>useContext(DataContext)