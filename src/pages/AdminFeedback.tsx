import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import DataTable from "@/components/DataTable";
import { feedbacks, FeedbackItem } from "@/services/dummyData";
import { Button } from "@/components/ui/button";
import { Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminFeedback = () => {
  const [data, setData] = useState<FeedbackItem[]>(feedbacks);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">User Feedback</h1>
          <p className="text-muted-foreground">View and manage user feedback</p>
        </div>

        <DataTable<FeedbackItem>
          columns={[
            { header: "User", accessor: (r) => (
              <div>
                <p className="font-medium">{r.userName}</p>
                <p className="text-xs text-muted-foreground">{r.email}</p>
              </div>
            )},
            { header: "Rating", accessor: (r) => (
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />)}
              </div>
            )},
            { header: "Message", accessor: "message" },
            { header: "Date", accessor: "date" },
            {
              header: "Actions",
              accessor: (r) => (
                <Button variant="ghost" size="sm" onClick={() => { setData(d => d.filter(f => f.id !== r.id)); toast.success("Deleted"); }} className="h-7 px-2 text-destructive">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              ),
            },
          ]}
          data={data}
          emptyMessage="No feedback yet"
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminFeedback;
