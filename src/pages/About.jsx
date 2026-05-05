import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-20 ">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8 ">
        <h1 className="text-4xl font-bold text-center">About shopvrix</h1>

        <p className="text-gray-700 text-lg">
          Welcome to <span className="font-semibold text-red-600">shopvrix</span>, your one-stop online marketplace for everything you need. From electronics and fashion to home decor, groceries, and beyond — we bring it all together in one place for a seamless shopping experience.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Our Mission</h2>
          <p className="text-gray-700 text-base">
            At shopvrix, our mission is to make online shopping simple, affordable, and enjoyable for everyone. We connect customers with thousands of products across every category — delivered fast and with care.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Why Choose shopvrix?</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Thousands of products across all categories in one place</li>
            <li>AI-powered search to find exactly what you need</li>
            <li>Reliable customer support, always ready to help</li>
            <li>Easy returns and hassle-free shopping experience</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Our Vision</h2>
          <p className="text-gray-700 text-base">
            We envision a smarter way to shop — where finding the right product is effortless. ShopVrix is committed to delivering a modern, AI-powered marketplace that saves you time and always puts you first.
          </p>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Join the shopvrix Family</h3>
          <p className="text-gray-700 mb-4">
            Whether you're shopping for yourself, your home, or someone special — shopVrix has something for everyone.
          </p>
          <Link to={'/products'}>
            <button className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition duration-300">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;