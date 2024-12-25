import React from "react";
import WelcomeMessage from "../components/dashboard2/WelcomeMessage";
import CardGrid from "../components/dashboard2/Cards";

const Dashboard = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[67%] mx-auto">

        <div className="mt-10 mb-10">
          <WelcomeMessage />
        </div>

        <div className="mb-20">
          <CardGrid />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
