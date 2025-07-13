"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import './css/layout.css';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/check-session");
      const data = await res.json();
      if (!data.loggedIn) router.push("/admin/login");
      else setCheckingSession(false);
    };
    checkSession();
  }, [router]);

  if (checkingSession) return <div className="checking">Checking session...</div>;

  return (
    <div className="layout-container">
      <Navbar />
      <main className="layout-content">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        {children}
      </main>
    </div>
  );
}
