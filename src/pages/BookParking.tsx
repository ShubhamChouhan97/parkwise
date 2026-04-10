import { useState, useMemo } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { vehicleTypes, parkingAreas } from "@/services/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle } from "lucide-react";

const BookParking = () => {
  const [form, setForm] = useState({ vehicleType: "", vehicleNumber: "", parkingArea: "", slot: "", duration: 1 });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedArea = parkingAreas.find((a) => a.id === form.parkingArea);
  const selectedVehicle = vehicleTypes.find((v) => v.id === form.vehicleType);

  const fee = useMemo(() => {
    if (!selectedVehicle || !form.duration) return 0;
    const areaFee = selectedArea?.feePerHour ?? 0;
    return (selectedVehicle.feePerHour + areaFee) * form.duration;
  }, [selectedVehicle, selectedArea, form.duration]);

  const slots = useMemo(() => {
    if (!selectedArea) return [];
    return Array.from({ length: selectedArea.availableSlots }, (_, i) => `${selectedArea.name.charAt(5)}-${String(i + 1).padStart(2, "0")}`);
  }, [selectedArea]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.vehicleType) e.vehicleType = "Required";
    if (!form.vehicleNumber.trim()) e.vehicleNumber = "Required";
    if (!form.parkingArea) e.parkingArea = "Required";
    if (!form.slot) e.slot = "Required";
    if (form.duration < 1) e.duration = "Min 1 hour";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1000);
  };

  if (success) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-2">Slot: {form.slot} | Duration: {form.duration}h | Fee: ${fee}</p>
            <Button onClick={() => { setSuccess(false); setForm({ vehicleType: "", vehicleNumber: "", parkingArea: "", slot: "", duration: 1 }); }} className="mt-4">
              Book Another
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Book Parking</h1>
          <p className="text-muted-foreground">Reserve your parking spot in advance</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl border shadow-card p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Vehicle Type</Label>
              <select
                value={form.vehicleType}
                onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select type</option>
                {vehicleTypes.map((v) => <option key={v.id} value={v.id}>{v.name} (${v.feePerHour}/hr)</option>)}
              </select>
              {errors.vehicleType && <p className="text-xs text-destructive mt-1">{errors.vehicleType}</p>}
            </div>
            <div>
              <Label>Vehicle Number</Label>
              <Input placeholder="MH-12-AB-1234" value={form.vehicleNumber} onChange={(e) => setForm({ ...form, vehicleNumber: e.target.value })} className="mt-1" />
              {errors.vehicleNumber && <p className="text-xs text-destructive mt-1">{errors.vehicleNumber}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Parking Area</Label>
              <select
                value={form.parkingArea}
                onChange={(e) => setForm({ ...form, parkingArea: e.target.value, slot: "" })}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select area</option>
                {parkingAreas.map((a) => <option key={a.id} value={a.id}>{a.name} ({a.availableSlots} slots)</option>)}
              </select>
              {errors.parkingArea && <p className="text-xs text-destructive mt-1">{errors.parkingArea}</p>}
            </div>
            <div>
              <Label>Select Slot</Label>
              <select
                value={form.slot}
                onChange={(e) => setForm({ ...form, slot: e.target.value })}
                disabled={!form.parkingArea}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              >
                <option value="">Select slot</option>
                {slots.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.slot && <p className="text-xs text-destructive mt-1">{errors.slot}</p>}
            </div>
          </div>

          <div>
            <Label>Duration (hours)</Label>
            <Input type="number" min={1} max={24} value={form.duration} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })} className="mt-1 max-w-[200px]" />
            {errors.duration && <p className="text-xs text-destructive mt-1">{errors.duration}</p>}
          </div>

          <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Estimated Parking Fee</span>
            <span className="text-2xl font-display font-bold text-primary">${fee}</span>
          </div>

          <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Confirm Booking
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default BookParking;
