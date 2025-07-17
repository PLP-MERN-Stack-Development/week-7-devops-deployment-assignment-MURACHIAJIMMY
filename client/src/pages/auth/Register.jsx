import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
// import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/register", form);
      // login({ token: res.data.token, user: res.data.user });
      toast.success(res.data.message || "Registration successful 🎉");
      // toast.success("Registration successful 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-white-100 via-white-200 to-white-300 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-pink-200/50 backdrop-blur-m border border-blue-300 rounded-xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <Input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
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
        <Button type="submit" className="w-full bg-red-600 hover:bg-green-700 text-white font-semibold transition" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
        <p
          onClick={() => navigate("/login")}
          className="text-sm text-center text-blue-600 underline cursor-pointer hover:text-blue-800 transition "
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default Register;
