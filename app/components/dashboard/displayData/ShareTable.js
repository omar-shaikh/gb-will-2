"use client";

import React, { useEffect, useState } from "react";
import UserPool from "@/UserPool";
import UserSharesPieChart from "./UserSharesPieChart"; // Make sure to import your UserSharesPieChart component

const ShareTable = () => {
    const [shares, setShares] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataAvailable, setDataAvailable] = useState(false); // New state for data availability
    const dataApiUrl = 'https://nch5yapsj2.execute-api.us-west-1.amazonaws.com/dev/get-data'; // Your API Gateway endpoint

    useEffect(() => {
        const fetchUserData = async () => {
            const user = UserPool.getCurrentUser();

            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        console.error("Session error:", err);
                        setLoading(false); // Stop loading if there is an error
                        return;
                    }

                    user.getUserAttributes(async (err, attributes) => {
                        if (err) {
                            console.error("Error fetching user attributes:", err);
                            setLoading(false); // Stop loading if there is an error
                        } else {
                            const emailAttr = attributes.find(attr => attr.getName() === "email");
                            const email = emailAttr ? emailAttr.getValue() : null;

                            if (email) {
                                try {
                                    const response = await fetch(dataApiUrl, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ body: JSON.stringify({ email }) }),
                                    });

                                    if (response.ok) {
                                        const data = await response.json();
                                        const parsedBody = JSON.parse(data.body);

                                        // Check if parsedBody.data exists and is an object
                                        if (parsedBody.data && typeof parsedBody.data === 'object') {
                                            const sharesArray = Object.entries(parsedBody.data)
                                                .filter(([key, value]) => key !== "netWorth" && value.N && value.N !== "0")
                                                .map(([key, value]) => ({ name: key, amount: parseInt(value.N, 10) }));

                                            setShares(sharesArray);
                                            setDataAvailable(sharesArray.length > 0); // Check if there are shares
                                        } else {
                                            console.error("No user data available.");
                                            setDataAvailable(false); // No data available
                                        }
                                    } else {
                                        console.error("Failed to fetch user data:", response.status);
                                        setDataAvailable(false); // No data available
                                    }
                                } catch (error) {
                                    console.error("Error fetching user data:", error.message);
                                    setDataAvailable(false); // No data available
                                } finally {
                                    setLoading(false); // Stop loading after fetching
                                }
                            } else {
                                setLoading(false); // Stop loading if no email found
                            }
                        }
                    });
                });
            } else {
                setLoading(false); // Stop loading if no user found
            }
        };

        fetchUserData();
    }, []);


    // Hide the entire component if there is no data available
    if (!dataAvailable) {
        return null; // Return null to hide the component
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                <span className="sr-only">Loading...</span>
            </div>
            )}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Share Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {shares.map((share, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {share.name}
                            </th>
                            <td className="px-6 py-4">
                                {share.amount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShareTable;
