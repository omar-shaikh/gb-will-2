"use client";
import React, { useState } from "react";
import { UserPool } from '../../UserPool';
import GreenLogo from '../../assets/GreenLogo.png';
import PurpleLogo from '../../assets/PurpleLogo.png'; // Import your PurpleLogo
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Import useRouter

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState(""); // New state for first name
    const [lastName, setLastName] = useState(""); // New state for last name
    const router = useRouter(); // Initialize useRouter

    const onSubmit = (event) => {
        event.preventDefault();

        // Include first name and last name in the sign-up call
        UserPool.signUp(email, password, [
            {
                Name: "given_name", // Attribute for first name
                Value: firstName,
            },
            {
                Name: "family_name", // Attribute for last name
                Value: lastName,
            }
        ], null, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log("onSuccess: ", data);
                // Navigate to the confirmAccount page upon success
                router.push("/confirmAccount");
            }
        });
    };

    return (
        <section className="mt-20 dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 lg:py-16 lg:grid-cols-12">
                <div className="w-full p-6 mx-auto bg-white rounded-lg shadow dark:bg-gray-800 sm:max-w-xl lg:col-span-6 sm:p-8">
                    <a href="#" className="inline-flex items-center mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                        <Image 
                            src={PurpleLogo} 
                            width={140}   // Replace with the actual width in pixels
                            height={32}  // Replace with the actual height in pixels
                            alt="Logo"
                            className="dark:hidden"  // Hide this in dark mode
                        />
                        <Image 
                            src={GreenLogo} 
                            width={140}   // Replace with the actual width in pixels
                            height={32}  // Replace with the actual height in pixels
                            alt="Logo"
                            className="hidden dark:block"  // Show this only in dark mode
                        />
                    </a>
                    <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                        Create your Account
                    </h1>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                        Start your website in seconds. Already have an account? <a href="login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>.
                    </p>
                    <form className="mt-4 space-y-6 sm:mt-6" onSubmit={onSubmit}>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input
                                    type="text"
                                    id="first-name"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="First Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <input
                                    type="text"
                                    id="last-name"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Last Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                            <div className="px-5 text-center text-gray-500 dark:text-gray-400">or</div>
                            <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                        <div className="space-y-3">
                            <a href="#" className="w-full inline-flex items-center justify-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_13183_10121)">
                                        <path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"/>
                                        <path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" fill="#34A853"/>
                                        <path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC05"/>
                                        <path d="M10.7019 3.95551C12.6597 3.95551 14.4372 4.84896 15.7111 6.22242L18.0781 3.61354C15.6734 1.13653 12.3989 0 10.7019 0C6.92087 0 3.46322 2.13007 1.76562 5.51233H5.08857C5.88266 3.57784 7.76762 1.95551 10.7019 1.95551V3.95551Z" fill="#EA4335"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_13183_10121">
                                            <rect width="20" height="20" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                Sign up with Google
                            </a>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignupForm;
