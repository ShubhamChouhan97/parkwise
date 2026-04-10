import DashboardLayout from "@/layouts/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-lg mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>

        <div className="bg-card rounded-xl border shadow-card p-6 space-y-5">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-display font-bold">
              {user?.name?.charAt(0) ?? "U"}
            </div>
            <div>
              <p className="text-lg font-semibold">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div>
            <Label>Full Name</Label>
            <Input defaultValue={user?.name} className="mt-1" />
          </div>
          <div>
            <Label>Email</Label>
            <Input defaultValue={user?.email} className="mt-1" disabled />
          </div>
          <div>
            <Label>Phone</Label>
            <Input defaultValue={user?.phone} className="mt-1" />
          </div>

          <Button onClick={() => toast.success("Profile updated")} className="gradient-primary text-primary-foreground">
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
