import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 bg-gray-800 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2.5 h-2.5 bg-gray-800 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2.5 h-2.5 bg-gray-800 rounded-full animate-bounce" />
      </div>
      <p className="text-sm text-gray-400">Loading...</p>
    </div>
  )
}

export default LoadingSpinner