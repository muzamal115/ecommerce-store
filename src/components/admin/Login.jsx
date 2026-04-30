import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../auth/AuthContext'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      setError("")
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/admin')
    } catch (error) {
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">

        {/* Header */}
        <div className="mb-8">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <span className="text-indigo-600 text-lg">🛒</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to your dashboard</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
            {error}
          </div>
        )}

        {/* Fields */}
        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
            />
          </div>

        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

      </div>

    </div>
  )
}

export default Login