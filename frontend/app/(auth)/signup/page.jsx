"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SuccessMessage from '../components/SuccessMessage'
import ErrorMessage from '../components/ErrorMessage'

const Signup = () => {
  const [first_name, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [phone_no, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    setError();
    setSuccess('');

    if (password !== confirm_password) {
      setError("Password and confirmation do not match!");
      return;
    }

    const response = await fetch('http://localhost:8000/users/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name,
        surname,
        password,
        confirm_password,
        phone_no,
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      //Handle Errors
      setError(data.detail || "Registration Failed!");
    } else {
      setSuccess("Sign Up Successfull.")
      //Reset form
      setFirstName('');
      setSurname('');
      setPassword('');
      setConfirmPassword('');
      setEmail('');
      setPhoneNo('');
    }
  };

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

            <ErrorMessage message={error} />
            <SuccessMessage message={success} />

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create your account today
            </h1>

            <form
              className="space-y-4 md:space-y-6"
              method="POST"
              action="/user/register/"
              onSubmit={handleRegister}
            >
              <div className="flex flex-wrap gap-2">
                <div className="flex-1">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                    placeholder="John"
                    required
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}

                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="surname"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="surame"
                    id="surname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                    placeholder="Doe"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone_no"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your phone number
                </label>
                <input
                  type="phone"
                  name="phone_no"
                  id="phone_no"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                  placeholder="254 712 345 678"
                  value={phone_no}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
                />
              </div>
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}

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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                />
              </div>
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
//                onClick={() => {}} //TODO:Change to the correct function
                className="text-white bg-blue-600 py-1.5 px-4 rounded font-bold w-full"
              >
                Sign Up!
              </button>
            </form>

            <div className="flex items-center">
              <div className="w-full h-0.5 bg-gray-200 "></div>
              <div className="px-5 text-center text-gray-500 ">or</div>
              <div className="w-full h-0.5 bg-gray-200 "></div>
            </div>

            <!--form id="connect-google-button" method="post" action="">
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
                Sign up with Google
              </button>
            </form-->
            <p className="text-sm font-light text-gray-500 ">
              You have an account already?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:underline "
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
