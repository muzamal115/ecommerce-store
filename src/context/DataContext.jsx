import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

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
    <DataContext.Provider value={{ data, setData, fetchAllProducts }}>
      {children}
    </DataContext.Provider>
  );
};
export const getData=()=>useContext(DataContext)