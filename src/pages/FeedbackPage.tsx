import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const FeedbackPage = () => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) { toast.error("Please enter feedback"); return; }
    if (!rating) { toast.error("Please select a rating"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 800);
  };

  if (sent) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-2">Thank you!</h2>
            <p className="text-muted-foreground">Your feedback has been submitted.</p>
            <Button onClick={() => { setSent(false); setMessage(""); setRating(0); }} className="mt-4">Submit Another</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-lg mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Feedback</h1>
          <p className="text-muted-foreground">We'd love to hear from you</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-xl border shadow-card p-6 space-y-5">
          <div>
            <Label>Rating</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} type="button" onClick={() => setRating(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}>
                  <Star className={`w-7 h-7 transition-colors ${(hover || rating) >= s ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label>Your Feedback</Label>
            <Textarea placeholder="Tell us about your experience..." value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 min-h-[120px]" />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Submit Feedback
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default FeedbackPage;
