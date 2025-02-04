import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00C6FE] via-[#B656AF] to-[#FF5541]">
      {/* Navigation */}
      <div className="absolute top-0 right-0 p-6">
        <div className="flex gap-4">
          <a href="/login" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 
            text-white px-6 py-2 rounded-full transition-all">
            Login
          </a>
          <a href="/register" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 
            text-white px-6 py-2 rounded-full transition-all">
            Register
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Meet BullBillion, Your AI Assistant
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Experience the future of communication with BullBillion, your intelligent AI companion. 
            Smarter conversations start here.
          </p>
          <a href="/chat" className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-full 
            backdrop-blur-sm border border-white/20 transition-all cursor-pointer">
            Get Started Free
          </a>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              title: "BullBillion's Advanced AI",
              description: "Powered by cutting-edge language models for natural, human-like interactions"
            },
            {
              title: "Connect with BullBillion instantly with lightning-fast, contextual responses"
            },
            {
              title: "Track and analyze your conversations with BullBillion for deeper insights"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Floating Gradient Orb */}
        <div className="fixed -z-10 top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 
          w-[500px] h-[500px] rounded-full bg-[#BDA6FB] blur-[128px] opacity-30" />
      </div>
    </div>
  )
}

export default Home