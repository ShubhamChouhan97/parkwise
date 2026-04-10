import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import DataTable from "@/components/DataTable";
import { vehicleTypes, VehicleType } from "@/services/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { toast } from "sonner";

const ManageVehicles = () => {
  const [data, setData] = useState<VehicleType[]>(vehicleTypes);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<VehicleType | null>(null);
  const [form, setForm] = useState({ name: "", feePerHour: 0 });

  const openAdd = () => { setEditing(null); setForm({ name: "", feePerHour: 0 }); setModal(true); };
  const openEdit = (v: VehicleType) => { setEditing(v); setForm({ name: v.name, feePerHour: v.feePerHour }); setModal(true); };

  const handleSave = () => {
    if (!form.name.trim()) { toast.error("Enter vehicle type name"); return; }
    if (editing) {
      setData((d) => d.map((v) => v.id === editing.id ? { ...v, ...form } : v));
      toast.success("Vehicle type updated");
    } else {
      setData((d) => [...d, { id: `NEW-${Date.now()}`, ...form }]);
      toast.success("Vehicle type added");
    }
    setModal(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Manage Vehicles</h1>
            <p className="text-muted-foreground">Configure vehicle types and fees</p>
          </div>
          <Button onClick={openAdd} className="gradient-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" /> Add Type
          </Button>
        </div>

        <DataTable<VehicleType>
          columns={[
            { header: "Vehicle Type", accessor: "name" },
            { header: "Fee per Hour", accessor: (r) => `$${r.feePerHour}` },
            {
              header: "Actions",
              accessor: (r) => (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(r)} className="h-7 px-2"><Edit className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => { setData((d) => d.filter((v) => v.id !== r.id)); toast.success("Deleted"); }} className="h-7 px-2 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              ),
            },
          ]}
          data={data}
        />

        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30">
            <div className="bg-card rounded-xl border shadow-elevated p-6 w-full max-w-sm animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-display font-semibold">{editing ? "Edit" : "Add"} Vehicle Type</h3>
                <button onClick={() => setModal(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
                <div><Label>Fee per Hour ($)</Label><Input type="number" value={form.feePerHour} onChange={(e) => setForm({ ...form, feePerHour: +e.target.value })} className="mt-1" /></div>
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

export default ManageVehicles;
