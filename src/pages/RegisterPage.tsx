import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.phone) e.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter 10-digit phone";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      register(form.name, form.email, form.phone, form.password);
      navigate("/dashboard");
      setLoading(false);
    }, 800);
  };

  const fields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
    { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
    { id: "phone", label: "Phone Number", type: "tel", placeholder: "1234567890" },
    { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
    { id: "confirm", label: "Confirm Password", type: "password", placeholder: "••••••••" },
  ];

  return (
    <AuthLayout>
      <h2 className="text-2xl font-display font-bold mb-1">Create account</h2>
      <p className="text-muted-foreground mb-6">Start managing your parking today</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((f) => (
          <div key={f.id}>
            <Label htmlFor={f.id}>{f.label}</Label>
            <Input id={f.id} type={f.type} placeholder={f.placeholder} value={(form as Record<string, string>)[f.id]} onChange={set(f.id)} className="mt-1" />
            {errors[f.id] && <p className="text-xs text-destructive mt-1">{errors[f.id]}</p>}
          </div>
        ))}
        <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Create Account
        </Button>
      </form>
      <p className="text-sm text-center mt-6 text-muted-foreground">
        Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
