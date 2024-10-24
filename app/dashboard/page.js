import WelcomeMessage from "../components/WelcomeMessage";
import Card from "../components/productCards"; // Import the Card component
import ProductsSubtitle from "../components/productsSubtitle";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 mt-10">
      <WelcomeMessage />
      <ProductsSubtitle />
      {/* Flexbox container for cards with gap and controlled max width */}
      <div className="flex flex-wrap justify-between w-full gap-5 sm:max-w-[80%] lg:max-w-[67%] mt-6">
        <Card
          title="Noteworthy technology acquisitions 2021"
          description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
          link="#"
        />
        <Card
          title="Innovative Tech Trends"
          description="Explore the latest trends in technology that are shaping the future."
          link="#"
        />
        <Card
          title="Understanding Artificial Intelligence"
          description="A deep dive into how AI is transforming various industries."
          link="#"
        />
        {/* Add more cards as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
