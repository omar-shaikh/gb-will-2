import React from 'react';

const Card = ({ title, description, link }) => {
  return (
    <a
      href={link}
      className="block w-full sm:w-[80%] lg:w-[calc(33.333%-20px)] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </a>
  );
};

export default Card;
