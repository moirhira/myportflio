import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const navItems = [
    { to: "/admin", icon: "fas fa-chart-pie", label: "Dashboard", end: true },
    { to: "/admin/projects", icon: "fas fa-folder-open", label: "Projects" },
    { to: "/admin/profile", icon: "fas fa-user-pen", label: "Profile" },
    { to: "/admin/settings", icon: "fas fa-gear", label: "Settings" },
];

export default function AdminLayout() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <div className="admin-root">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="p-5 mb-2">
                    <a href="/#home" className="font-display text-xl font-bold gradient-heading">
                        Mohamed<span style={{ color: "var(--light-text)" }}>.</span>
                    </a>
                    <p className="text-xs mt-1" style={{ color: "var(--muted-text)" }}>Admin Panel</p>
                </div>

                <nav className="flex flex-col gap-1 px-3">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `admin-nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            <i className={`${item.icon} w-5 text-center`} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto p-4">
                    <button
                        onClick={() => navigate("/")}
                        className="admin-nav-link w-full text-left"
                        style={{ color: "var(--cyan)" }}
                    >
                        <i className="fas fa-arrow-left w-5 text-center" />
                        <span>Back to Site</span>
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="admin-main">
                {/* Top bar */}
                <header className="admin-topbar">
                    <button
                        className="md:hidden text-xl mr-4"
                        style={{ color: "var(--light-text)" }}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <i className="fas fa-bars" />
                    </button>
                    <div className="flex-1" />
                    <div className="flex items-center gap-3">
                        <span className="text-sm" style={{ color: "var(--muted-text)" }}>
                            <i className="fas fa-circle text-xs mr-1" style={{ color: "#22c55e" }} />
                            Admin
                        </span>
                    </div>
                </header>

                {/* Page content */}
                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
