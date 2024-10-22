// app/dashboard/page.js
import WelcomeMessage from "../components/WelcomeMessage";

const Dashboard = () => {
  return (
    <div className="flex justify-center min-h-screen p-6 mt-10">
      <WelcomeMessage />
    </div>
  );
};

export default Dashboard;
