import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", form);
      login({ token: res.data.token, user: res.data.user });
      toast.success("Logged in successfully 🚀");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white/70 backdrop-blur-m border border-yellow-6000 rounded-xl shadow-md space-y-5">
        <h1 className="text-2xl font-bold text-center">Login To your Account</h1>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button
        type="submit"
        className="w-full bg-pink-600 hover:bg-green-700 text-white font-semibold transition"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
       <p
        onClick={() => navigate("/register")}
        className="text-sm text-center text-blue-600 underline cursor-pointer hover:text-blue-800 transition"
      >
        Don't have an account? Register
      </p>
      </form>
    </div>
  );
};

export default Login;
