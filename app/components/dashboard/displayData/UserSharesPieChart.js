"use client";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; // Import necessary components
import UserPool from "@/UserPool"

// Register required components with Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const UserSharesPieChart = () => {
    const [userShares, setUserShares] = useState([]);
    const [netWorth, setNetWorth] = useState(null); // Net worth state
    const dataApiUrl = 'https://nch5yapsj2.execute-api.us-west-1.amazonaws.com/dev/get-data'; // Your API Gateway endpoint

    useEffect(() => {
        const fetchUserData = async () => {
            const user = UserPool.getCurrentUser();

            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        console.error("Session error:", err);
                        return;
                    }

                    user.getUserAttributes(async (err, attributes) => {
                        if (err) {
                            console.error("Error fetching user attributes:", err);
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

                                        // Set net worth and shares
                                        setNetWorth(parsedBody.data.netWorth?.N || "N/A");
                                        const sharesArray = Object.entries(parsedBody.data)
                                            .filter(([key, value]) => key !== "netWorth" && value.N && value.N !== "0")
                                            .map(([key, value]) => ({ name: key, value: parseInt(value.N, 10) }));

                                        setUserShares(sharesArray);
                                    } else {
                                        console.error("Failed to fetch user data:", response.status);
                                    }
                                } catch (error) {
                                    console.error("Error fetching user data:", error.message);
                                }
                            }
                        }
                    });
                });
            }
        };

        fetchUserData();
    }, []);

    // Chart configuration
    const data = {
        labels: userShares.map(share => share.name), // Use original names as labels
        datasets: [
            {
                data: userShares.map(share => share.value),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]
            }
        ]
    };

    return (
        <div className="flex flex-wrap p-4 border rounded-lg shadow-lg bg-white">
            {/* Left Section with Chart */}
            <div className="w-full md:w-1/2 p-4">
            <div className="flex justify-center"> {/* Center the heading horizontally */}
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
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserSharesPieChart;
