import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdPhone, MdPassword, MdArrowBack } from 'react-icons/md';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { BiLogoMeta } from 'react-icons/bi';
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doSignInWithApple, doSignInWithMeta } from '../auth';
import { useAuth } from '../contexts/index';

const Login = () => {
  const auth = useAuth();
  const { user, loggedInUser, loading } = auth || {};

  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      const user = await doSignInWithEmailAndPassword(email, password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/chat');
      }
    }
  };
  
  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    // TODO: Implement Firebase phone login
  };

  // const handleOTPRequest = async (e) => {
  //   e.preventDefault();
  //   // TODO: Implement Firebase OTP login
  // };

  const handleSocialLogin = async (provider) => {
    try {
      let user;
      switch (provider) {
        case 'google':
          user = await doSignInWithGoogle();
          console.log(user);
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

  const loginMethods = [
    { id: 'email', label: 'EMAIL', icon: <MdEmail className="text-xl" /> },
    { id: 'phone', label: 'PHONE', icon: <MdPhone className="text-xl" /> },
    // { id: 'otp', label: 'OTP', icon: <MdPassword className="text-xl" /> }
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
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome to BullBillion</h2>
        
        {/* Login Method Tabs */}
        {/* <div className="flex gap-2 mb-6">
          {loginMethods.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setLoginMethod(id)}
              className={`flex-1 py-2 rounded-full text-white transition-all flex items-center justify-center gap-2
                ${loginMethod === id 
                  ? 'bg-white/20 border border-white/20' 
                  : 'bg-white/5 hover:bg-white/10'}`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div> */}

        {/* Email Password Form */}
        {loginMethod === 'email' && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="relative">
              <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
            <div className="relative">
              <MdPassword className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
            <button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white rounded-full py-2 transition-all cursor-pointer">
              Login
            </button>
          </form>
        )}

        {/* Phone Login Form */}
        {loginMethod === 'phone' && (
          <form onSubmit={handlePhoneLogin} className="space-y-4">
            <div className="relative">
              <MdPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl" />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
            <button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white rounded-full py-2 transition-all cursor-pointer">
              Send Code
            </button>
          </form>
        )}

        {/* OTP Form */}
        {/* {loginMethod === 'otp' && (
          <form onSubmit={handleOTPRequest} className="space-y-4">
            <div className="relative">
              <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl" />
              <input
                type="text"
                placeholder="Email or Phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
            <button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white rounded-full py-2 transition-all cursor-pointer">
              Send One-Time Code
            </button>
          </form>
        )} */}

        {/* Social Login Options */}
        <div className="mt-8">
          <div className="text-white/60 text-center mb-4">Or continue with</div>
          <div className="grid grid-cols-2 gap-2">
            {socialProviders.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => handleSocialLogin(id)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full py-2 text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center text-white/60">
          Don't have an account?{' '}
          <a href="/register" className="text-white hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;