import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, Car, CalendarCheck, MessageSquare, User, Settings,
  ParkingCircle, Truck, LogOut, Menu, X, Bell, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

const userNav = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Book Parking", path: "/book-parking", icon: ParkingCircle },
  { label: "My Bookings", path: "/my-bookings", icon: CalendarCheck },
  { label: "Feedback", path: "/feedback", icon: MessageSquare },
  { label: "Profile", path: "/profile", icon: User },
];

const adminNav = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Manage Parking", path: "/admin/parking", icon: ParkingCircle },
  { label: "Manage Vehicles", path: "/admin/vehicles", icon: Truck },
  { label: "Feedback", path: "/admin/feedback", icon: MessageSquare },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const nav = isAdmin ? adminNav : userNav;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "hsl(var(--sidebar-bg))" }}
      >
        <div className="p-5 flex items-center gap-3 border-b" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <Car className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-display font-bold" style={{ color: "hsl(var(--sidebar-active-fg))" }}>
            ParkEase
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "gradient-primary text-primary-foreground shadow-md"
                    : "hover:bg-[hsl(var(--sidebar-hover))]"
                }`}
                style={active ? {} : { color: "hsl(var(--sidebar-fg))" }}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-all hover:bg-[hsl(var(--sidebar-hover))]"
            style={{ color: "hsl(var(--sidebar-fg))" }}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navbar */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <h2 className="text-lg font-display font-semibold hidden sm:block">
              {nav.find((n) => n.path === location.pathname)?.label ?? "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
            </Button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                  {user?.name?.charAt(0) ?? "U"}
                </div>
                <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-elevated border p-1 z-50">
                  <div className="px-3 py-2 border-b mb-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <Link
                    to={isAdmin ? "/admin" : "/profile"}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors w-full text-destructive"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto animate-fade-in">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
