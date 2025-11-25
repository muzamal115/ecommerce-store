import React from 'react'
import Carousel from '../components/Carousel'
import Category from '../components/Category'
import MidBanner from '../components/MidBanner'
import Features from '../components/Features'

const Home = () => {
  return (
    <div>
      <Carousel/>
      <Category/>
      <MidBanner/>
      <Features/>
    </div>
  )
}

export default Home