const WelcomeMessage = () => {
  return (
      <div className="mb-6 p-8 py-17 w-full sm:w-[80%] md:w-[67%] h-[20%] bg-white rounded-md dark:bg-gray-800 shadow">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard!</h1>
        <p className="md:text-lg sm:text-sm">
          You have uncompleted documents below. Choose your product and press 
          “Complete Document” to complete the process with our GoodBricks software.
        </p>
      </div>
  );
};

export default WelcomeMessage;
