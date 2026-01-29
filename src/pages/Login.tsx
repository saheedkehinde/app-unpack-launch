import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/profile");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary via-primary/90 to-background">
      <Navigation />
      
      <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-amber-500 mb-4">
              <Sparkles className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/60">Sign in to manage your bookings</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-sidebar rounded-2xl p-6 border border-sidebar-border space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sidebar-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sidebar-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full btn-book-now"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <p className="text-center text-sm text-sidebar-foreground/60">
              Don't have an account?{" "}
              <Link to="/signup" className="text-accent hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
