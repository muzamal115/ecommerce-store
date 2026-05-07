import React, { useEffect, useState } from "react";

import { getData } from "../../context/DataContext";



const Table = ({columns,children}) => {
 
  




// Filter Data Logic


  
 
  


  return (
  
   
      <div className="overflow-x-auto  hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b bg-gray-100 border-gray-300">
             
             {columns.map((col,i)=>(
              <th className="p-2  " key={i}>{col}</th>
             ))} 
              
            </tr>

          </thead>
          <tbody>
           {
            children
           }
          
          </tbody>
        </table>
      </div>

      

        
   
  );
};

export default Table;
