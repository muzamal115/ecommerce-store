import React from 'react'
import { Truck, Lock, RotateCcw, Clock } from 'lucide-react'
import { constant } from 'firebase/firestore/pipelines'
import { getData } from '../context/DataContext'

const features = [
    {icon: Truck, text: 'Free Shipping', subtext: 'On orders over $100'},
    {icon: Lock, text: 'Secure Payment', subtext: '100% protected payments'},
    {icon: RotateCcw, text: 'Easy Returns', subtext: '30-day return policy'},
    {icon: Clock, text: '24/7 Support', subtext: 'Dedicated customer service'},
]


const Features = () => {

    const{uploadProductsToFirestore}=getData()

const addData=()=>{
    uploadProductsToFirestore()

}
  return (
    <div className='bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 '>
        <div className=" max-w-7xl mx-auto  ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 gap-y-8">
                {
                    features.map((feature,index)=>{
                        return <div key={index} className='flex items-center justify-center text-center sm:text-left  '>
                            <feature.icon className='text-gray-600 shrink-0  h-10 w-10 ' aria-hidden="true"/>
                            <div className='ml-4'>
                                <p className='text-base font-medium text-gray-900'>{feature.text}</p>
                                <p className= 'mt-1 text-sm text-gray-500'>{feature.subtext}</p>
                            </div>

                        </div>
                    })
                }
               

            </div>
           
        </div>
        {/* <div className='w-full text-center mt-2'>
              <button className=' bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2' onClick={addData}>Add Data</button>
        </div> */}
        

    </div>
  )
}

export default Features