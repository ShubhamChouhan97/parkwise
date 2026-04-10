import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email"); return; }
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 800);
  };

  if (sent) {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-2xl font-display font-bold mb-2">Check your email</h2>
          <p className="text-muted-foreground mb-6">We've sent a password reset link to <strong>{email}</strong></p>
          <Link to="/login" className="text-primary font-medium hover:underline">Back to login</Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h2 className="text-2xl font-display font-bold mb-1">Forgot password?</h2>
      <p className="text-muted-foreground mb-6">Enter your email and we'll send a reset link</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} className="mt-1" />
          {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>
        <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Send Reset Link
        </Button>
      </form>
      <p className="text-sm text-center mt-6 text-muted-foreground">
        <Link to="/login" className="text-primary font-medium hover:underline">Back to login</Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
