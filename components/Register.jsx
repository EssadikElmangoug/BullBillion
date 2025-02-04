import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdPhone, MdPassword, MdPerson, MdArrowBack } from 'react-icons/md';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { BiLogoMeta } from 'react-icons/bi';
import { doCreateUserWithEmailAndPassword, doSignInWithApple, doSignInWithGoogle, doSignInWithMeta } from '../auth';

const Register = () => {
  const navigate = useNavigate();
  const [registerMethod, setRegisterMethod] = useState('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      // Create a new user with email and password
      await doCreateUserWithEmailAndPassword(email, password);
      // Redirect to login page
      navigate('/login');

    } catch (error) {
      console.error("Error registering with email and password", error);
      // Handle errors here, e.g., show a notification to the user
    }
  };

  const handlePhoneRegister = async (e) => {
    e.preventDefault();
    
  };

  const handleSocialRegister = async (provider) => {
    try {
      let user;
      switch (provider) {
        case 'google':
          user = await doSignInWithGoogle();
          break;
        case 'apple':
          user = await doSignInWithApple();
          break;
        case 'meta':
          user = await doSignInWithMeta();
          break;
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/chat');
      }
    } catch (error) {
      console.error(`Error signing in with ${provider}`, error);
      setIsSigningIn(false);
    }
  };

  const registerMethods = [
    { id: 'email', label: 'EMAIL', icon: <MdEmail className="text-xl" /> },
    { id: 'phone', label: 'PHONE', icon: <MdPhone className="text-xl" /> }
  ];

  const socialProviders = [
    { id: 'google', label: 'Google', icon: <FaGoogle className="text-xl" /> },
    // { id: 'apple', label: 'Apple', icon: <FaApple className="text-xl" /> },
    { id: 'meta', label: 'Meta', icon: <BiLogoMeta className="text-xl" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00C6FE] via-[#B656AF] to-[#FF5541] flex items-center justify-center p-4">
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-4 left-4 text-white/80 hover:text-white transition-colors"
      >
        <MdArrowBack className="text-3xl" />
      </button>

      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Join Jau</h2>
        
        {/* Register Method Tabs */}
        {/* <div className="flex gap-2 mb-6">
          {registerMethods.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setRegisterMethod(id)}
              className={`flex-1 py-2 rounded-full text-white transition-all flex items-center justify-center gap-2
                ${registerMethod === id 
                  ? 'bg-white/20 border border-white/20' 
                  : 'bg-white/5 hover:bg-white/10'}`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div> */}

        {/* Email Registration Form */}
        {registerMethod === 'email' && (
          <form onSubmit={handleEmailRegister} className="space-y-4">
            <div className="relative">
              <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
            <div className="relative">
              <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
            <div className="relative">
              <MdPassword className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
            <div className="relative">
              <MdPassword className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
            <button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white rounded-full py-2 transition-all cursor-pointer">
              Create Account
            </button>
          </form>
        )}

        {/* Phone Registration Form */}
        {registerMethod === 'phone' && (
          <form onSubmit={handlePhoneRegister} className="space-y-4">
            <div className="relative">
              <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
            <div className="relative">
              <MdPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
            <button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white rounded-full py-2 transition-all cursor-pointer">
              Send Verification Code
            </button>
          </form>
        )}

        {/* Social Registration Options */}
        <div className="mt-8">
          <div className="text-white/60 text-center mb-4">Or register with</div>
          <div className="grid grid-cols-2 gap-2">
            {socialProviders.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => handleSocialRegister(id)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full py-2 text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center text-white/60">
          Already have an account?{' '}
          <a href="/login" className="text-white hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;