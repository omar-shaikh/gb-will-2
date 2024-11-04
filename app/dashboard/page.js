import WelcomeMessage from "../components/dashboard/otherItems/WelcomeMessage";
import Card from "../components/dashboard/otherItems/productCards";
import ProductsSubtitle from "../components/dashboard/otherItems/productsSubtitle";
import UserSharesPieChart from "../components/dashboard/displayData/UserSharesPieChart";
import ShareTable from "../components/dashboard/displayData/ShareTable"; // Import the ShareTable component

const Dashboard = () => {
    // Dummy share data, replace this with your actual data
    const shares = [
        { name: 'SShare', amount: 150 },
        { name: 'HShare', amount: 50 },
        // Add other shares here
    ];

    return (
        <div className="flex flex-col items-center min-h-screen p-6 mt-10">
            <WelcomeMessage />
            <div className="flex  justify-between w-full gap-5 sm:max-w-[80%] lg:max-w-[67%] mt-6">
                <div className="flex flex-col lg:w-1/2 mr-4"> {/* Add margin to the right */}
                    <UserSharesPieChart />
                </div>

                <div className="flex flex-col lg:w-1/2"> 
                    <ShareTable shares={shares} /> {/* Pass the shares data to the ShareTable component */}
                </div>
            </div>

            <ProductsSubtitle />
            <div className="flex flex-wrap justify-between w-full gap-5 sm:max-w-[80%] lg:max-w-[67%] mt-6">
                <Card
                    title="Advanced High Tech Exponent Calculator"
                    description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
                    link="/dashboard/exponentCalc"
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
            </div>
        </div>
    );
};

export default Dashboard;
