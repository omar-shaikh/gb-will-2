'use client';
// components/MathForm.js
import Image from 'next/image';
import { useState } from 'react';
import GreenLogo from '../../assets/GreenLogo.png';
import PurpleLogo from '../../assets/PurpleLogo.png';

const MathForm = () => {
  const [base, setBase] = useState('');
  const [exponent, setExponent] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://bfvhtflrde.execute-api.us-west-1.amazonaws.com/dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ base: Number(base), exponent: Number(exponent) }), // Convert to numbers
      });

      if (!response.ok) throw new Error('Error in calculation');

      const data = await response.json();
      setResult(data.body);
      setError('');
    } catch (err) {
      setError('Failed to fetch result');
      setResult(null);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Calculator
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="base" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Base</label>
                <input 
                  type="number"
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
              </div>
              <div>
                <label htmlFor="exponent" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Exponent</label>
                <input 
                  type="number"
                  value={exponent}
                  onChange={(e) => setExponent(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
              </div>
              <button 
                type="submit" 
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Calculate
              </button>
            </form>
            {result && (
              <div>
                <h3>Result:</h3>
                <p>{result}</p>
              </div>
            )}
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MathForm;
