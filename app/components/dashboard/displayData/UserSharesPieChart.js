"use client";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import UserPool from "@/UserPool";

// Register required components with Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const UserSharesPieChart = () => {
    const [userShares, setUserShares] = useState([]);
    const [netWorth, setNetWorth] = useState(null);
    const [loading, setLoading] = useState(true);
    const [noDataFound, setNoDataFound] = useState(false);
    const [error, setError] = useState(null); // New state for error handling
    const dataApiUrl = 'https://nch5yapsj2.execute-api.us-west-1.amazonaws.com/dev/get-data';

    useEffect(() => {
        const fetchUserData = async () => {
            const user = UserPool.getCurrentUser();

            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        console.error("Session error:", err);
                        setLoading(false);
                        return;
                    }

                    user.getUserAttributes(async (err, attributes) => {
                        if (err) {
                            console.error("Error fetching user attributes:", err);
                            setLoading(false);
                            setError("Error fetching user attributes.");
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

                                        // Check if data is available
                                        if (parsedBody.data) {
                                            // Set net worth and shares
                                            setNetWorth(parsedBody.data.netWorth?.N || "N/A");
                                            const sharesArray = Object.entries(parsedBody.data)
                                                .filter(([key, value]) => key !== "netWorth" && value.N && value.N !== "0")
                                                .map(([key, value]) => ({ name: key, value: parseInt(value.N, 10) }));

                                            setUserShares(sharesArray);

                                            // Check if sharesArray is empty
                                            if (sharesArray.length === 0) {
                                                setNoDataFound(true);
                                            } else {
                                                setNoDataFound(false);
                                            }
                                        } else {
                                            setNoDataFound(true);
                                        }
                                    } else {
                                        console.error("Failed to fetch user data:", response.status);
                                        setError("Failed to fetch user data.");
                                    }
                                } catch (error) {
                                    console.error("Error fetching user data:", error.message);
                                    setError("Error fetching user data.");
                                } finally {
                                    setLoading(false);
                                }
                            } else {
                                setLoading(false);
                                setError("No email found for the user.");
                            }
                        }
                    });
                });
            } else {
                setLoading(false);
                setError("User not found.");
            }
        };

        fetchUserData();
    }, []);

    const data = {
        labels: userShares.map(share => share.name),
        datasets: [
            {
                data: userShares.map(share => share.value),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]
            }
        ]
    };

    // Hide the component if no data is found
    if (noDataFound) {
        return null; // Hide the entire component
    }

    return (
        <div className="flex flex-wrap p-4 border rounded-lg shadow-lg bg-white relative">
            {/* Loading indicator overlay */}
            {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                <span className="sr-only">Loading...</span>
            </div>
            )}

            {/* Check for errors */}
            {error && (
                <div className="w-full p-4 text-center">
                    <h2 className="text-xl font-bold text-red-600">{error}</h2>
                </div>
            )}

            {/* Chart and other content */}
            {!loading && !error && (
                <>
                    {/* Left Section with Chart */}
                    <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center">
                        <div className="flex justify-center">
                            <h1 className="text-xl font-bold mb-4">Your Share Distribution</h1>
                        </div>
                        <Pie data={data} />
                    </div>

                    {/* Right Section with Net Worth and Legend */}
                    <div className="w-full md:w-1/2 p-4">
                        <h2 className="text-xl font-bold mb-2">
                            Your Net Worth: <span className="text-blue-600">{netWorth}</span>
                        </h2>
                        <div className="mt-6">
                            <ul>
                                {data.labels.map((label, index) => (
                                    <li key={label} className="flex items-center mb-1">
                                        <span
                                            className="w-4 h-4 rounded-full mr-2"
                                            style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                                        ></span>
                                        {label}: {data.datasets[0].data[index]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserSharesPieChart;
