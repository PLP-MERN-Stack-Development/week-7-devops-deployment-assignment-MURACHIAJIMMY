import { Outlet, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ui/toggle"; // optional custom icon toggle
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <div className="font-bold text-xl cursor-pointer" onClick={() => navigate("/dashboard")}>
          📝 Blog Dashboard
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm hidden sm:block">Hello👋👋 {user?.username}</span>
          <ModeToggle />
          <Button variant="outline" onClick={logout}
           className="bg-pink-600 hover:bg-red-700 text-white font-semibold tracking-wide transition">
            Logout
          </Button>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
