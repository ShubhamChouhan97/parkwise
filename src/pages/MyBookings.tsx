import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import DataTable from "@/components/DataTable";
import { bookings, Booking } from "@/services/dummyData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Printer, XCircle } from "lucide-react";
import { toast } from "sonner";

const MyBookings = () => {
  const [data, setData] = useState<Booking[]>(bookings);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = data.filter((b) => {
    const matchSearch = b.vehicleNumber.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || b.status === filter;
    return matchSearch && matchFilter;
  });

  const handleCancel = (id: string) => {
    setData((prev) => prev.map((b) => b.id === id ? { ...b, status: "cancelled" as const } : b));
    toast.success("Booking cancelled");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">My Bookings</h1>
          <p className="text-muted-foreground">View and manage your parking bookings</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by ID or vehicle number..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2">
            {["all", "active", "completed", "cancelled"].map((f) => (
              <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className={filter === f ? "gradient-primary text-primary-foreground" : ""}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <DataTable<Booking>
          columns={[
            { header: "Booking ID", accessor: "id" },
            { header: "Vehicle", accessor: "vehicleNumber" },
            { header: "Area", accessor: "parkingArea" },
            { header: "Date", accessor: (r) => `${r.date} ${r.time}` },
            { header: "Duration", accessor: (r) => `${r.duration}h` },
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
            {
              header: "Actions",
              accessor: (r) => (
                <div className="flex gap-1">
                  {r.status === "active" && (
                    <Button variant="ghost" size="sm" onClick={() => handleCancel(r.id)} className="text-destructive h-7 px-2">
                      <XCircle className="w-3.5 h-3.5 mr-1" /> Cancel
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => toast.info("Printing...")} className="h-7 px-2">
                    <Printer className="w-3.5 h-3.5 mr-1" /> Print
                  </Button>
                </div>
              ),
            },
          ]}
          data={filtered}
          emptyMessage="No bookings found"
        />
      </div>
    </DashboardLayout>
  );
};

export default MyBookings;
