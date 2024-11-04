import "../globals.css";
import DashboardNav from "../components/dashboard/dashboardNav";

export const metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <DashboardNav />
        {children}
      </body>
    </html>
  );
}
