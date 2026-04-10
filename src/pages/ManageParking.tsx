import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import DataTable from "@/components/DataTable";
import { parkingAreas, ParkingArea } from "@/services/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { toast } from "sonner";

const ManageParking = () => {
  const [data, setData] = useState<ParkingArea[]>(parkingAreas);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<ParkingArea | null>(null);
  const [form, setForm] = useState({ name: "", location: "", totalSlots: 0, availableSlots: 0, feePerHour: 0 });

  const openAdd = () => { setEditing(null); setForm({ name: "", location: "", totalSlots: 0, availableSlots: 0, feePerHour: 0 }); setModal(true); };
  const openEdit = (a: ParkingArea) => { setEditing(a); setForm({ name: a.name, location: a.location, totalSlots: a.totalSlots, availableSlots: a.availableSlots, feePerHour: a.feePerHour }); setModal(true); };

  const handleSave = () => {
    if (!form.name.trim() || !form.location.trim()) { toast.error("Fill all fields"); return; }
    if (editing) {
      setData((d) => d.map((a) => a.id === editing.id ? { ...a, ...form } : a));
      toast.success("Parking area updated");
    } else {
      setData((d) => [...d, { id: `NEW-${Date.now()}`, ...form }]);
      toast.success("Parking area added");
    }
    setModal(false);
  };

  const handleDelete = (id: string) => {
    setData((d) => d.filter((a) => a.id !== id));
    toast.success("Parking area deleted");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Manage Parking</h1>
            <p className="text-muted-foreground">Add, edit, or remove parking areas</p>
          </div>
          <Button onClick={openAdd} className="gradient-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" /> Add Area
          </Button>
        </div>

        <DataTable<ParkingArea>
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Location", accessor: "location" },
            { header: "Total Slots", accessor: "totalSlots" },
            { header: "Available", accessor: "availableSlots" },
            { header: "Fee/hr", accessor: (r) => `$${r.feePerHour}` },
            {
              header: "Actions",
              accessor: (r) => (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(r)} className="h-7 px-2"><Edit className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(r.id)} className="h-7 px-2 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              ),
            },
          ]}
          data={data}
        />

        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30">
            <div className="bg-card rounded-xl border shadow-elevated p-6 w-full max-w-md animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-display font-semibold">{editing ? "Edit" : "Add"} Parking Area</h3>
                <button onClick={() => setModal(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
                <div><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-1" /></div>
                <div className="grid grid-cols-3 gap-3">
                  <div><Label>Total Slots</Label><Input type="number" value={form.totalSlots} onChange={(e) => setForm({ ...form, totalSlots: +e.target.value })} className="mt-1" /></div>
                  <div><Label>Available</Label><Input type="number" value={form.availableSlots} onChange={(e) => setForm({ ...form, availableSlots: +e.target.value })} className="mt-1" /></div>
                  <div><Label>Fee/hr ($)</Label><Input type="number" value={form.feePerHour} onChange={(e) => setForm({ ...form, feePerHour: +e.target.value })} className="mt-1" /></div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setModal(false)}>Cancel</Button>
                  <Button className="flex-1 gradient-primary text-primary-foreground" onClick={handleSave}>Save</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageParking;
