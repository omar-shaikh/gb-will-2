import React, { useEffect, useState } from 'react';
import UserPool from '@/UserPool';

const LambdaCalculator = () => {
    const [email, setEmail] = useState("");
    const [inputs, setInputs] = useState({
        netWorth: '',
        H: '',
        W: '',
        S: '',
        D: '',
        SS: '',
        SD: '',
        SSS: '',
        SSD: '',
        F: '',
        FF: '',
        FFF: '',
        FFFF: '',
        FM: '',
        M: '',
        MM: '',
        RB: '',
        RS: '',
        PB: '',
        PS: '',
        MT: '',
        HM: 'no',
    });
    const [result, setResult] = useState(null); // Initialize result state
    const [userData, setUserData] = useState(null); // State to store fetched data

    const lambdaApiUrl = 'https://zboghkosc8.execute-api.us-west-1.amazonaws.com/dev/';

    useEffect(() => {
        const fetchUserAttributes = () => {
            const user = UserPool.getCurrentUser();

            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        console.error("Session error:", err);
                        return;
                    }

                    user.getUserAttributes((err, attributes) => {
                        if (err) {
                            console.error("Error fetching user attributes:", err);
                        } else {
                            attributes.forEach(attribute => {
                                if (attribute.getName() === "email") {
                                    setEmail(attribute.getValue());
                                }
                            });
                        }
                    });
                });
            }
        };

        fetchUserAttributes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state
    
        const dataToSubmit = { ...inputs, email };
    
        try {
            const response = await fetch(lambdaApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body: JSON.stringify(dataToSubmit) }),
            });
    
            if (response.ok) {
                const result = await response.json();
                const parsedResult = JSON.parse(result.body);
                setResult(parsedResult);
            } else {
                setResult({ error: `Error: ${response.status}` });
            }
        } catch (error) {
            setResult({ error: `Error: ${error.message}` });
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-11/12 md:w-7/12 lg:w-3/5 xl:w-2/5">
                <h1 className="text-xl font-bold mb-4 text-center">Lambda Function Calculator</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        {Object.keys(inputs).map((key) => (
                            <div key={key}>
                                <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    {key}:
                                </label>
                                <input
                                    type={key === 'netWorth' || key.startsWith('F') || key.startsWith('W') || key.startsWith('S') ? 'number' : 'text'}
                                    id={key}
                                    name={key}
                                    value={inputs[key]}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                />
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LambdaCalculator;
