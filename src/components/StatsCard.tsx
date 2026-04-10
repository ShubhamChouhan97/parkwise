import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  gradient?: "primary" | "accent" | "success";
}

const gradientMap = {
  primary: "gradient-primary",
  accent: "gradient-accent",
  success: "gradient-success",
};

const StatsCard = ({ title, value, icon: Icon, trend, trendUp, gradient = "primary" }: StatsCardProps) => (
  <div className="bg-card rounded-xl border shadow-card p-5 hover:shadow-elevated transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-3xl font-display font-bold mt-1">{value}</p>
        {trend && (
          <p className={`text-xs mt-2 font-medium ${trendUp ? "text-success" : "text-destructive"}`}>
            {trendUp ? "↑" : "↓"} {trend}
          </p>
        )}
      </div>
      <div className={`w-11 h-11 rounded-xl ${gradientMap[gradient]} flex items-center justify-center`}>
        <Icon className="w-5 h-5 text-primary-foreground" />
      </div>
    </div>
  </div>
);

export default StatsCard;
