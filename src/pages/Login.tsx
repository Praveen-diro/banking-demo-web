import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedOption, setSelectedOption] = useState('Corporate');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const loginSectionRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Always succeed login for demo purposes
      await login(formData.email, formData.password);
      window.scrollTo({ top: 0 });
      navigate('/');
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  const scrollToLogin = () => {
    loginSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Navigation */}
          <div className="flex justify-between py-2 text-sm border-b">
            <div className="flex space-x-6">
              <Link 
                to="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedOption('Personal');
                }}
                className={`text-gray-600 hover:text-[#1d1E9C] transition-colors ${
                  selectedOption === 'Personal' 
                    ? 'text-[#1d1E9C] underline decoration-2 underline-offset-[4px]' 
                    : ''
                }`}
              >
                Personal
              </Link>
              <Link 
                to="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedOption('Corporate');
                }}
                className={`text-gray-600 hover:text-[#1d1E9C] transition-colors ${
                  selectedOption === 'Corporate' 
                    ? 'text-[#1d1E9C] underline decoration-2 underline-offset-[4px]' 
                    : ''
                }`}
              >
                Corporate
              </Link>
              <Link 
                to="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedOption('Commercial');
                }}
                className={`text-gray-600 hover:text-[#1d1E9C] transition-colors ${
                  selectedOption === 'Commercial' 
                    ? 'text-[#1d1E9C] underline decoration-2 underline-offset-[4px]' 
                    : ''
                }`}
              >
                Commercial
              </Link>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-[#1d1E9C] hover:underline transition-colors">Schedule a meeting</Link>
              <div className="relative group">
                <Link to="/" className="text-gray-600 hover:text-[#1d1E9C] hover:underline transition-colors inline-flex items-center">
                  Customer service
                  <svg 
                    className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                {/* Dropdown menu - hidden by default */}
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-50">
                  <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#1d1E9C]">Contact Us</Link>
                  <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#1d1E9C]">Help Center</Link>
                  <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#1d1E9C]">FAQs</Link>
                  <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#1d1E9C]">Support</Link>
                </div>
              </div>
              <Link to="/" className="text-gray-600 hover:text-[#1d1E9C] hover:underline transition-colors">Español</Link>
            </div>
          </div>
          
          {/* Main Navigation */}
          <div className="flex h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 text-[#1d1E9C] font-bold text-xl mr-8">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 28 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#1d1E9C]"
                >
                  {/* Front face */}
                  <path
                    d="M8 8L16 4L24 8L16 12L8 8Z"
                    fill="#1d1E9C"
                  />
                  {/* Right face */}
                  <path
                    d="M24 8L16 12V24L24 20V8Z"
                    fill="#4141B3"
                  />
                  {/* Left face */}
                  <path
                    d="M8 8L16 12V24L8 20V8Z"
                    fill="#6161C7"
                  />
                </svg>
                <span className="text-2xl mt-2">BankDash</span>
              </Link>
              
              <div className="flex items-center gap-2">
                {/* <img 
                  src="bank_logo.png"
                  alt="Bank Logo"
                  className="w-30 h-14 object-cover mr-5"
                /> */}
                {/* <span className="text-xl font-bold">Bank Portal</span> */}
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-gray-600 hover:text-[#1d1E9C] transition-colors">Checking</Link>
                <Link to="/" className="text-gray-600 hover:text-[#1d1E9C] transition-colors">Savings & CDs</Link>
                <Link to="/" className="text-gray-600 hover:text-[#1d1E9C] transition-colors">Credit cards</Link>
                <Link to="/" className="text-gray-600 hover:text-[#1d1E9C] transition-colors">Home loans</Link>
                <Link to="/" className="text-gray-600 hover:text-[#1d1E9C] transition-colors">Auto</Link>
                <Link to="/" className="text-gray-600 hover:text-[#1d1E9C] transition-colors">Investing</Link>
                <Link to="/" className="text-gray-600 hover:text-[#1d1E9C] transition-colors">Education & goals</Link>
                <Link to="/" className="text-gray-600 hover:text-[#1d1E9C] transition-colors">Travel</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-[#1d1E9C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text Content */}
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Banking Made Simple,
                <br />
                Secure & Personal
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                Experience seamless banking with our innovative digital solutions.
                Open an account in minutes and start your journey to financial freedom.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-[#1d1E9C] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  Open an Account
                </button>
                <button 
                  onClick={scrollToLogin}
                  className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
                >
                  Login
                </button>
              </div>
            </div>
            
            {/* Right side - Dashboard Preview */}
            <div className="relative">
              <img
                src="/dashboard.png"
                alt="Banking Dashboard Preview"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div ref={loginSectionRef} className="flex-1 flex flex-col md:flex-row scroll-mt-16">
        {/* Left Side - Promotional Content */}
        <div className="hidden md:flex md:w-1/2 p-8 md:p-16 bg-white items-center justify-end">
          <div className="max-w-md">
            <h1 className="text-2xl font-semibold mb-2">Enjoy</h1>
            <div className="text-6xl font-bold text-[#1d1E9C] mb-4">$300</div>
            <h2 className="text-2xl font-bold mb-4">New Bank Portal  checking customers</h2>
            <p className="text-gray-600 mb-8">
              Open a Bank Portal  Total Checking® account with qualifying activities.
            </p>
            <button className="bg-[#1d1E9C] text-white px-8 py-3 rounded-lg hover:bg-[#1d1E9C]/90 transition-colors">
              Open an account
            </button>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 bg-white flex items-center justify-start">
          <div className="w-full max-w-md bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1d1E9C] focus:border-[#1d1E9C] shadow-sm"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1d1E9C] focus:border-[#1d1E9C] shadow-sm"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#1d1E9C] focus:ring-[#1d1E9C] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember Me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#1d1E9C] hover:text-[#1d1E9C]/90">
                    Forgot Username/Password
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1d1E9C] text-white py-3 px-4 rounded-lg hover:bg-[#1d1E9C]/90 transition-colors duration-200"
              >
                Sign In
              </button>
            </form>
            {/* <div className="mt-4 text-center text-sm text-gray-500">
              <p>Demo credentials:</p>
              <p>Email: dirolabs@gmail.com</p>
              <p>Password: Diro@123</p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Why Choose Bank Portal  Section */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Bank Portal ?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience banking that puts you first with innovative features designed to make your financial life easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Secure Banking */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1d1E9C]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#1d1E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Banking</h3>
              <p className="text-gray-600">
                Bank with confidence knowing your money and data are protected by industry-leading security measures.
              </p>
            </div>

            {/* Mobile Banking */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1d1E9C]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#1d1E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Mobile Banking</h3>
              <p className="text-gray-600">
                Manage your accounts, make payments, and deposit checks from anywhere with our mobile app.
              </p>
            </div>

            {/* Credit Cards */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1d1E9C]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#1d1E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Credit Cards</h3>
              <p className="text-gray-600">
                Choose from our range of credit cards with competitive rates and exclusive rewards.
              </p>
            </div>

            {/* Easy Transfers */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1d1E9C]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#1d1E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Transfers</h3>
              <p className="text-gray-600">
                Send money to friends and family instantly with zero fees between Bank Portal  accounts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Banking Products Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Banking Products</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover financial solutions tailored to your needs with our comprehensive range of banking products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Checking Accounts */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <img
                  src="/checking_acccount1.jpg"
                  alt="Checking Account Dashboard"
                  className="w-full rounded-lg  h-44"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Checking Accounts</h3>
              <p className="text-gray-600 mb-6">
                Manage your daily spending with no monthly fees and free ATM withdrawals worldwide.
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center text-[#1d1E9C] font-medium hover:underline"
              >
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Savings Accounts */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <img
                  src="/savings_account.jpg"
                  alt="Savings Account Dashboard"
                  className="w-full rounded-lg h-44"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Savings Accounts</h3>
              <p className="text-gray-600 mb-6">
                Earn competitive interest rates and grow your savings with our flexible accounts.
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center text-[#1d1E9C] font-medium hover:underline"
              >
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Investment Options */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <img
                  src="/foreign_account.jpg"
                  alt="Investment Dashboard"
                  className="w-full rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Investment Options</h3>
              <p className="text-gray-600 mb-6">
                Build your wealth with our range of investment products and expert guidance.
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center text-[#1d1E9C] font-medium hover:underline"
              >
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ready to Start Banking CTA Section */}
      <div className="bg-[#1d1E9C] py-16 md:py-24 rounded-3xl mx-4 sm:mx-8 lg:mx-16 my-8 sm:my-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Banking with Us?</h2>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Bank Portal  for their financial needs.
            Open an account in minutes and experience banking at its best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center bg-white text-[#1d1E9C] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Open an Account
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 