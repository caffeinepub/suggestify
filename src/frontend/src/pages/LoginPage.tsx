import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  School,
  Shield,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import type { Role } from "../types";

const ROLES: {
  value: Role;
  label: string;
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    value: "student",
    label: "Student",
    icon: <GraduationCap className="w-5 h-5" />,
    description: "Submit & track complaints",
  },
  {
    value: "staff",
    label: "Staff",
    icon: <Users className="w-5 h-5" />,
    description: "Report facility issues",
  },
  {
    value: "faculty",
    label: "Faculty",
    icon: <School className="w-5 h-5" />,
    description: "Academic & infrastructure",
  },
  {
    value: "admin",
    label: "Admin",
    icon: <Shield className="w-5 h-5" />,
    description: "Manage all complaints",
  },
];

export function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const validate = () => {
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      errs.email = "Enter a valid email address";
    if (!password) errs.password = "Password is required";
    else if (password.length < 4)
      errs.password = "Password must be at least 4 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // TODO: Firebase Auth - signInWithEmailAndPassword(auth, email, password)
    // TODO: On success, getDoc(doc(db, 'users', user.uid)) to fetch role from Firestore
    await new Promise((r) => setTimeout(r, 800)); // Simulate network delay

    const success = login(email, password, selectedRole);
    setIsLoading(false);

    if (success) {
      toast.success(`Welcome back! Logged in as ${selectedRole}`);
      if (selectedRole === "admin") {
        navigate({ to: "/admin" });
      } else {
        navigate({ to: "/dashboard" });
      }
    } else {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleQuickLogin = (role: Role) => {
    const demoMap: Record<Role, string> = {
      student: "rahul.sharma@university.edu",
      faculty: "priya.singh@university.edu",
      staff: "arjun.mehta@university.edu",
      admin: "admin@university.edu",
    };
    setEmail(demoMap[role]);
    setPassword("demo1234");
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-secondary flex">
      {/* Left panel — branding */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:flex flex-col justify-between w-[45%] bg-sidebar p-10 relative overflow-hidden"
      >
        {/* Background decorative circles */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute rounded-full border border-white w-16 h-16 top-[7%] left-[11%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute rounded-full border border-white w-24 h-24 top-[14%] left-[22%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute rounded-full border border-white w-32 h-32 top-[21%] left-[33%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute rounded-full border border-white w-40 h-40 top-[28%] left-[44%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute rounded-full border border-white w-48 h-48 top-[35%] left-[55%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute rounded-full border border-white w-56 h-56 top-[42%] left-[66%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute rounded-full border border-white w-64 h-64 top-[49%] left-[77%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute rounded-full border border-white w-72 h-72 top-[56%] left-[88%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute rounded-full border border-white w-80 h-80 top-[63%] left-[99%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute rounded-full border border-white w-96 h-96 top-[70%] left-[10%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute rounded-full border border-white w-[440px] h-[440px] top-[3%] left-[88%] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute rounded-full border border-white w-[480px] h-[480px] top-[84%] left-[33%] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/30">
              <span className="text-white text-lg font-bold font-display">
                S
              </span>
            </div>
            <span className="text-white font-display text-2xl font-bold">
              Suggestify
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-display font-bold text-white leading-tight">
                Smart Campus
                <br />
                <span className="text-sidebar-primary opacity-80">
                  Feedback
                </span>
              </h1>
              <p className="mt-4 text-white/70 text-base leading-relaxed max-w-xs">
                Report issues, track resolutions, and help build a better campus
                for everyone.
              </p>
            </div>

            <div className="space-y-3 mt-8">
              {[
                "Real-time complaint tracking",
                "AI-powered resolution plans",
                "Role-based access control",
                "Instant status notifications",
              ].map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-sidebar-primary" />
                  <span className="text-white/80 text-sm">{feat}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Complaints Resolved", value: "2,400+" },
              { label: "Response Time", value: "< 48h" },
              { label: "User Satisfaction", value: "96%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-white text-xl font-bold font-display">
                  {stat.value}
                </p>
                <p className="text-white/60 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-white text-base font-bold font-display">
                S
              </span>
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Suggestify
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Welcome back
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Sign in to access your campus feedback dashboard
            </p>
          </div>

          {/* Role selector */}
          <div className="mb-6">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
              Select Your Role
            </Label>
            <div
              className="grid grid-cols-2 gap-2"
              data-ocid="login.role.select"
            >
              {ROLES.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => {
                    setSelectedRole(role.value);
                    handleQuickLogin(role.value);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all duration-150 ${
                    selectedRole === role.value
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div
                    className={`shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${
                      selectedRole === role.value
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {role.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-none">
                      {role.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {role.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email)
                    setErrors((p) => ({ ...p, email: undefined }));
                }}
                autoComplete="email"
                data-ocid="login.email_input"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="login.email_error"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((p) => ({ ...p, password: undefined }));
                  }}
                  autoComplete="current-password"
                  data-ocid="login.password_input"
                  className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="login.password_error"
                >
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 mt-2 font-semibold text-sm"
              disabled={isLoading}
              data-ocid="login.submit_button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-primary font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
              onClick={() => toast.info("Registration will be available soon.")}
            >
              {/* TODO: Navigate to /register — Firebase Auth createUserWithEmailAndPassword */}
              Register
            </button>
          </p>

          <div className="mt-6 p-3 rounded-lg bg-muted/60 border border-border">
            <p className="text-xs text-muted-foreground text-center">
              <span className="font-semibold">Demo:</span> Click any role card
              above to auto-fill credentials
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
