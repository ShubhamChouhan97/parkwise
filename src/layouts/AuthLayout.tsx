import { ReactNode } from "react";
import { Car } from "lucide-react";

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex">
    <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12">
      <div className="text-primary-foreground max-w-md animate-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <Car className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-display font-bold">ParkEase</h1>
        </div>
        <p className="text-xl font-medium mb-4">Smart Vehicle Parking Management</p>
        <p className="text-primary-foreground/70 leading-relaxed">
          Find, book, and manage parking spots effortlessly. Real-time availability, instant booking, and seamless payments.
        </p>
      </div>
    </div>
    <div className="flex-1 flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md animate-fade-in">{children}</div>
    </div>
  </div>
);

export default AuthLayout;
