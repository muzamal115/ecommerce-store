import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("") // "success", "error", "loading"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "29bf6f37-011c-4181-9df0-e86df6417d8b", 
        name: formData.name,
        email: formData.email,
        message: formData.message
      })
    })

    const result = await response.json()

    if (result.success) {
      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } else {
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-10">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-5xl">
        <h2 className="text-4xl font-bold text-white text-center mb-10">Get in Touch with <span className="text-red-400">ShopVrix</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info Section */}
          <div className="text-white space-y-6">
            <div>
              <h3 className="text-2xl font-semibold">Contact Info</h3>
              <p className="text-gray-300">Have a question or need support? We're here to help you.</p>
            </div>
            <div>
              <p><strong>📍 Address:</strong> Hall No: 443, Near By Tanveer Pan Shop, Narawala Road, Faisalabad</p>
              <p><strong>📧 Email:</strong> muzammalghafoor04@gmail.com</p>
              <p><strong>📞 Phone:</strong> +92 3017860115</p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Type your message..."
                required
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Confirmation Messages */}
            {status === "success" && (
              <p className="text-green-400 text-center font-semibold">✅ Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-center font-semibold">❌ Something went wrong. Try again!</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-to-r from-red-500 to-purple-500 text-white font-semibold py-2 rounded-xl hover:opacity-90 transition-all duration-300"
            >
              {status === "loading" ? "Sending..." : "Send Message 🚀"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;