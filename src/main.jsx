import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { DataProvider } from './context/DataContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ToastContainer } from 'react-toastify'
import { OrderProvider } from './context/OrderContext.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <DataProvider>
    <CartProvider>
      <OrderProvider>
        <AuthProvider>
    
    <App />
    <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
</AuthProvider>
</OrderProvider>
    
    </CartProvider>
    </DataProvider>
    </ClerkProvider>
  </StrictMode>
)
