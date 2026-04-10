import DashboardLayout from "@/layouts/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { bookings } from "@/services/dummyData";
import { CalendarCheck, Car, ParkingCircle, Clock } from "lucide-react";
import DataTable from "@/components/DataTable";
import type { Booking } from "@/services/dummyData";

const UserDashboard = () => {
  const active = bookings.filter((b) => b.status === "active");
  const total = bookings.length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your parking overview.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Bookings" value={total} icon={CalendarCheck} trend="+12% this month" trendUp gradient="primary" />
          <StatsCard title="Active Bookings" value={active.length} icon={Car} gradient="success" />
          <StatsCard title="Available Slots" value={78} icon={ParkingCircle} gradient="accent" />
          <StatsCard title="Hours Parked" value={24} icon={Clock} trend="3h today" trendUp gradient="primary" />
        </div>

        <div>
          <h3 className="text-lg font-display font-semibold mb-3">Recent Bookings</h3>
          <DataTable<Booking>
            columns={[
              { header: "ID", accessor: "id" },
              { header: "Vehicle", accessor: "vehicleNumber" },
              { header: "Area", accessor: "parkingArea" },
              { header: "Date", accessor: "date" },
              { header: "Fee", accessor: (r) => <span className="font-semibold">${r.fee}</span> },
              {
                header: "Status",
                accessor: (r) => (
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                    r.status === "active" ? "bg-success/10 text-success" :
                    r.status === "completed" ? "bg-primary/10 text-primary" :
                    "bg-destructive/10 text-destructive"
                  }`}>{r.status}</span>
                ),
              },
            ]}
            data={bookings.slice(0, 5)}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
