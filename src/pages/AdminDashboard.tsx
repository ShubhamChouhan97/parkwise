import DashboardLayout from "@/layouts/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import DataTable from "@/components/DataTable";
import { bookings, parkingAreas, feedbacks, Booking } from "@/services/dummyData";
import { CalendarCheck, Car, ParkingCircle, Users, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const totalSlots = parkingAreas.reduce((a, b) => a + b.totalSlots, 0);
  const availSlots = parkingAreas.reduce((a, b) => a + b.availableSlots, 0);
  const revenue = bookings.reduce((a, b) => a + b.fee, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your parking system</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Bookings" value={bookings.length} icon={CalendarCheck} trend="+18% this week" trendUp gradient="primary" />
          <StatsCard title="Active Vehicles" value={bookings.filter(b => b.status === "active").length} icon={Car} gradient="success" />
          <StatsCard title="Available Slots" value={`${availSlots}/${totalSlots}`} icon={ParkingCircle} gradient="accent" />
          <StatsCard title="Revenue" value={`$${revenue}`} icon={TrendingUp} trend="+24%" trendUp gradient="primary" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-display font-semibold mb-3">Parking Areas</h3>
            <div className="space-y-3">
              {parkingAreas.map((area) => (
                <div key={area.id} className="bg-card rounded-xl border shadow-card p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{area.name}</p>
                      <p className="text-xs text-muted-foreground">{area.location}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">${area.feePerHour}/hr</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full gradient-primary transition-all"
                      style={{ width: `${((area.totalSlots - area.availableSlots) / area.totalSlots) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{area.availableSlots}/{area.totalSlots} slots available</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-display font-semibold mb-3">Recent Bookings</h3>
            <DataTable<Booking>
              columns={[
                { header: "ID", accessor: "id" },
                { header: "Vehicle", accessor: "vehicleNumber" },
                { header: "Fee", accessor: (r) => `$${r.fee}` },
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
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
