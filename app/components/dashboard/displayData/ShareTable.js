"use client";

import React, { useEffect, useState } from "react";
import UserPool from "@/UserPool";

const ShareTable = () => {
    const [shares, setShares] = useState([]);
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

                                        const sharesArray = Object.entries(parsedBody.data)
                                            .filter(([key, value]) => key !== "netWorth" && value.N && value.N !== "0")
                                            .map(([key, value]) => ({ name: key, amount: parseInt(value.N, 10) }));

                                        setShares(sharesArray);
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

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
