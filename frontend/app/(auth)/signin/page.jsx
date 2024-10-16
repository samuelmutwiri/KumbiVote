"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { login } from '../../services/auth';
import axios from 'axios'; // To send log messages to the backend
import Image from "next/image";

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For loading state
  //const logging_url = process.env.NEXT_PUBLIC_API_URL + '/api/sys/log/';
  const logging_url = 'http://localhost:8000//api/sys/log/';
  const router = useRouter();

  // Handle login with auth service
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    setSuccessMessage('');
    setIsLoading(true);  // Show loading state

    try {
      const response = await login(email, password, rememberMe);

      // Send log event to backend
      //const log_event = await axios.post(logging_url, { message: `User ${email} logged in successfully.` });
      //console.log(log_event);

      setSuccessMessage('Login successful!');
      setIsLoading(false);

      // Redirect to profile page after successful login
      setTimeout(() => router.push('/dashboard'), 800);  // Delay to allow success message animation
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
      setIsShaking(true); // Trigger shake animation
      setIsLoading(false);

      // Log error to backend
      //const log_event = await axios.post(logging_url, { message: `Login failed for user ${email}: ${error.message}` });
      //console.log(log_event);

      setTimeout(() => setIsShaking(false), 500); // Stop shaking after 500ms
    }
  };

  const handleForgotPassword = async() => {
    try {
      await axios.post('/api/forgot-password', { email });
      setSuccessMessage('Password reset link sent to your email');
    } catch(error) {
      setErrorMessage('Error sending reset instructions');
    }
  }

  return (
    <div className="py-4 md:py-8 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <Image src="/KumbiVote.svg" width={48} height={48} alt="Kumbi Logo" />
          KumbiVote
        </a>
        <div className="w-full bg-white/60  border-[0.5px]  backdrop-blur-sm rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>

            <form id="connect-google-button" method="post" action="">
              <button
                className="w-full inline-flex items-center justify-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200  "
                type="submit"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_13183_10121)">
                    <path
                      d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                      fill="#3F83F8"
                    ></path>
                    <path
                      d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                      fill="#FBBC04"
                    ></path>
                    <path
                      d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                      fill="#EA4335"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_13183_10121">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0.5)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
                Sign in with Google
              </button>
            </form>

            <div className="flex items-center">
              <div className="w-full h-0.5 bg-gray-200 "></div>
              <div className="px-5 text-center text-gray-500 ">or</div>
              <div className="w-full h-0.5 bg-gray-200 "></div>
            </div>

            <div className="login-container">
              <div className="notify flex items-center justify-center">
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="{errorMessage} text-red-500 text-sm"
                  >
                    {errorMessage}
                  </motion.div>
                )}
                  {successMessage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="{successMessage} text-green-500 text-sm">
                    {successMessage}
                    </motion.div>
                  )}
                <style jsx>
                  {`
                    .error{
                      background-color: #ffcccc;
                      border: 2px solid red;
                      border-radius: 5%;

                    }
                    .error-message {
                      color: red;
                    }
                    .success{
                      background-color: #ccffcc;
                      border: 2px solid green;
                      border-radius: 5%;
                    }
                    .success-message {
                      color: green;
                    }
                    .shaking {
                      animation: shake 0.5s ease-in-out;
                    }
                    @keyframes shake {
                      0%, 100% {
                        transform: translateX(0);
                      }
                      20%, 60% {
                        transform: translateX(-10px);
                      }
                      40%, 80% {
                        transform: translateX(10px);
                      }
                  }
                  `}
                </style>


              </div>

              <motion.form
                className="{login-form ${isShaking ? 'shaking' : '' }} space-y-4 md:space-y-6"
                method="POST"
                onSubmit={handleLogin}
              >
                <div className={`input-group ${errorMessage ? 'error' : ''}`}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="rememberMe"
                        aria-describedby="rememberMe"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-teal-300"
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 ">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href=""
                    className="text-sm font-medium text-blue-600 hover:underline "
                  >
                    Forgot password?
                  </a>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className="text-white bg-blue-600 py-1.5 px-4 rounded font-bold w-full"
                >
                  {isLoading ? 'Loading...' : 'Sign in'}
                </motion.button>


                <p className="text-sm font-light text-gray-500 ">
                  Don&apos;t have an account yet?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-blue-600 hover:underline "
                  >
                    Sign up
                  </a>
                </p>
                </div>
                </motion.form>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
