import React from "react";

const data = [
  {
    id: 1,
    title: "Noteworthy technology acquisitions",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    link: "#",
  },
  {
    id: 2,
    title: "The future of artificial intelligence",
    description:
      "Explore how AI is transforming industries and the impact it has on our daily lives.",
    link: "#",
  },
];

const Card = ({ title, description, link }) => {
  return (
    <a
      href={link}
      className="flex flex-col h-full items-center bg-white rounded-2xl shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 w-full"
    >
      <div className="flex items-center justify-center w-full h-96 rounded-t-2xl md:h-auto md:w-1/3 md:rounded-none md:rounded-s-lg">
        <span className="text-5xl font-bold text-gray-900 dark:text-white">2</span>
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal md:w-2/3">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </a>
  );
};

const CardGrid = () => {
  return (
    <div className="flex gap-6 w-full max-w-[100%] mx-auto">
      {data.map((item) => (
        <div key={item.id} className=" md:max-w-[100%]">
          <Card
            title={item.title}
            description={item.description}
            link={item.link}
          />
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
