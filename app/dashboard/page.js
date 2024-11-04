import WelcomeMessage from "../components/dashboard/otherItems/WelcomeMessage";
import Card from "../components/dashboard/otherItems/productCards";
import ProductsSubtitle from "../components/dashboard/otherItems/productsSubtitle";
import UserSharesPieChart from "../components/dashboard/displayData/UserSharesPieChart";
import ShareTable from "../components/dashboard/displayData/ShareTable"; // Import the ShareTable component

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center min-h-screen p-6 mt-10">
            <WelcomeMessage />
            <div className="flex  justify-between w-full gap-5 sm:max-w-[80%] lg:max-w-[67%] mt-6">
                <div className="flex flex-col lg:w-1/2 mr-4"> {/* Add margin to the right */}
                    <UserSharesPieChart />
                </div>

                <div className="flex flex-col lg:w-1/2"> 
                    <ShareTable />
                </div>
            </div>

            <ProductsSubtitle />
            <div className="flex flex-wrap justify-between w-full gap-5 sm:max-w-[80%] lg:max-w-[67%] mt-6">
                <Card
                    title="Will-based Estate Plan"
                    description="Explore the latest trends in technology that are shaping the future."
                    link="dashboard/willFormPage"
                />
            </div>
        </div>
    );
};

export default Dashboard;
