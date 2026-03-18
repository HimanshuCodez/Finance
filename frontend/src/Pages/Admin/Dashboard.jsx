import { useState } from "react";



const SMR_LOGO = "data:image/png;base64,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";

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <img
      src={SMR_LOGO}
      alt="SMR Finserv"
      style={{
        height: 48,
        width: "auto",
        objectFit: "contain",
        filter: "drop-shadow(0 2px 8px rgba(30,144,255,0.25))"
      }}
    />
  </div>
);



const Badge = ({ status }) => {
  const colors = {
    Active: { bg: "#0a2a1a", color: "#22c55e", border: "#22c55e40" },
    Inactive: { bg: "#1a1a2a", color: "#6b7280", border: "#6b728040" },
    Pending: { bg: "#2a1a0a", color: "#f59e0b", border: "#f59e0b40" },
    Completed: { bg: "#0a2a1a", color: "#22c55e", border: "#22c55e40" },
    Failed: { bg: "#2a0a0a", color: "#ef4444", border: "#ef444440" },
    Enterprise: { bg: "#0a1a2a", color: "#1e90ff", border: "#1e90ff40" },
    Premium: { bg: "#1a0a2a", color: "#a78bfa", border: "#a78bfa40" },
    Basic: { bg: "#1a1a1a", color: "#9ca3af", border: "#9ca3af40" },
  };
  const c = colors[status] || colors.Basic;
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
      letterSpacing: "0.5px", textTransform: "uppercase"
    }}>{status}</span>
  );
};

const EmptyState = ({ icon, title, subtitle }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: "80px 40px", textAlign: "center"
  }}>
    <div style={{
      width: 80, height: 80, borderRadius: "50%",
      background: "linear-gradient(135deg, #0e2540, #1e3a5a)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 36, marginBottom: 24,
      boxShadow: "0 8px 32px rgba(30,144,255,0.1)"
    }}>{icon}</div>
    <div style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 10, fontFamily: "'Playfair Display', serif" }}>{title}</div>
    <div style={{ color: "#3d6a9a", fontSize: 13, maxWidth: 320, lineHeight: 1.6 }}>{subtitle}</div>
  </div>
);

const AllUsers = ({ isMobile }) => (
  <div>
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ color: "#fff", fontSize: isMobile ? 22 : 26, fontWeight: 800, fontFamily: "'Playfair Display', serif", marginBottom: 6 }}>All Users</h1>
      <p style={{ color: "#5b9bd5", fontSize: 13 }}>Manage and monitor all registered users</p>
    </div>
    <div style={{ background: "#0d1b2a", borderRadius: 16, border: "1px solid #1e3a5a", overflow: "hidden" }}>
      <div style={{ 
        padding: isMobile ? "16px" : "20px 24px", 
        borderBottom: "1px solid #1e3a5a", 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 12 : 0,
        justifyContent: "space-between", 
        alignItems: isMobile ? "flex-start" : "center" 
      }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>User Directory</span>
        <input
          placeholder="Search users..."
          disabled
          style={{
            background: "#071323", border: "1px solid #1e3a5a", borderRadius: 8, padding: "8px 14px",
            color: "#8badc7", fontSize: 13, outline: "none", width: isMobile ? "100%" : 220, opacity: 0.5, cursor: "not-allowed"
          }}
        />
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
          <thead>
            <tr style={{ background: "#071323" }}>
              {["User", "Email", "Phone", "Designation"].map(h => (
                <th key={h} style={{ padding: "12px 20px", color: "#5b9bd5", fontSize: 11, fontWeight: 700, textAlign: "left", letterSpacing: "1px", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      <EmptyState icon="👥" title="Data Not Available" subtitle="No user records have been added yet. Users will appear here once they are registered on the platform." />
    </div>
  </div>
);

const DataRecord = ({ isMobile }) => (
  <div>
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ color: "#fff", fontSize: isMobile ? 22 : 26, fontWeight: 800, fontFamily: "'Playfair Display', serif", marginBottom: 6 }}>Data Records</h1>
      <p style={{ color: "#5b9bd5", fontSize: 13 }}>Complete transaction and financial activity log</p>
    </div>
    <div style={{ background: "#0d1b2a", borderRadius: 16, border: "1px solid #1e3a5a", overflow: "hidden" }}>
      <div style={{ 
        padding: isMobile ? "16px" : "20px 24px", 
        borderBottom: "1px solid #1e3a5a", 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 12 : 0,
        justifyContent: "space-between", 
        alignItems: isMobile ? "flex-start" : "center" 
      }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Transaction Log</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["All", "Investment", "Withdrawal", "Deposit"].map(f => (
            <button key={f} disabled style={{
              padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              background: f === "All" ? "#1e90ff40" : "#071323",
              color: f === "All" ? "#7ab8f5" : "#3d6a9a",
              border: `1px solid ${f === "All" ? "#1e90ff40" : "#0e2540"}`,
              cursor: "not-allowed", opacity: 0.6
            }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
          <thead>
            <tr style={{ background: "#071323" }}>
              {["Txn ID", "User", "Type", "Category", "Amount", "Date", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 20px", color: "#5b9bd5", fontSize: 11, fontWeight: 700, textAlign: "left", letterSpacing: "1px", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      <EmptyState icon="📊" title="Data Not Available" subtitle="No transaction records found. Financial activity and transaction history will be displayed here once data is available." />
    </div>
  </div>
);

const CreateUser = ({ isMobile }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", plan: "Basic", role: "User", password: "", confirm: "" });
  const [submitted, setSubmitted] = useState(false);
  const input = (label, key, type = "text", placeholder = "") => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ color: "#8badc7", fontSize: 12, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        placeholder={placeholder}
        style={{
          background: "#071323", border: "1px solid #1e3a5a", borderRadius: 10,
          padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none",
          transition: "border-color 0.2s"
        }}
        onFocus={e => e.target.style.borderColor = "#1e90ff"}
        onBlur={e => e.target.style.borderColor = "#1e3a5a"}
      />
    </div>
  );
  const select = (label, key, opts) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ color: "#8badc7", fontSize: 12, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>{label}</label>
      <select value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        style={{ background: "#071323", border: "1px solid #1e3a5a", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none" }}>
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: "#fff", fontSize: isMobile ? 22 : 26, fontWeight: 800, fontFamily: "'Playfair Display', serif", marginBottom: 6 }}>Create User</h1>
        <p style={{ color: "#5b9bd5", fontSize: 13 }}>Register a new user account on the platform</p>
      </div>
      {submitted ? (
        <div style={{
          background: "#0a2a1a", border: "1px solid #22c55e40", borderRadius: 16,
          padding: isMobile ? 24 : 40, textAlign: "center"
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <div style={{ color: "#22c55e", fontSize: 22, fontWeight: 800, fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>User Created Successfully</div>
          <div style={{ color: "#8badc7", fontSize: 14, marginBottom: 24 }}>The new user account has been registered and activation email sent.</div>
          <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", plan: "Basic", role: "User", password: "", confirm: "" }); }}
            style={{ background: "#1e90ff", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            Create Another
          </button>
        </div>
      ) : (
        <div style={{ background: "#0d1b2a", borderRadius: 16, border: "1px solid #1e3a5a", padding: isMobile ? 16 : 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 24, marginBottom: 24 }}>
            {input("Full Name", "name", "text", "John Doe")}
            {input("Email Address", "email", "email", "john@example.com")}
            {input("Phone Number", "phone", "tel", "+91 98765 43210")}
            {select("Plan", "plan", ["Basic", "Premium", "Enterprise"])}
            {select("Role", "role", ["User", "Manager", "Analyst"])}
          </div>
          <div style={{ borderTop: "1px solid #1e3a5a", paddingTop: 24, marginBottom: 24 }}>
            <div style={{ color: "#8badc7", fontSize: 12, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>Security</div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 24 }}>
              {input("Password", "password", "password", "Min 8 characters")}
              {input("Confirm Password", "confirm", "password", "Re-enter password")}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <button onClick={() => setSubmitted(true)}
              style={{
                background: "linear-gradient(135deg, #1e90ff, #0050c8)", color: "#fff",
                border: "none", borderRadius: 10, padding: "13px 32px", fontWeight: 700,
                fontSize: 14, cursor: "pointer", letterSpacing: "0.5px", flex: isMobile ? 1 : "initial"
              }}>
              Create User Account
            </button>
            <button onClick={() => setForm({ name: "", email: "", phone: "", plan: "Basic", role: "User", password: "", confirm: "" })}
              style={{
                background: "transparent", color: "#8badc7",
                border: "1px solid #1e3a5a", borderRadius: 10, padding: "13px 24px",
                fontWeight: 600, fontSize: 14, cursor: "pointer", flex: isMobile ? 1 : "initial"
              }}>
              Clear Form
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const UserRecord = () => (
  <div>
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, fontFamily: "'Playfair Display', serif", marginBottom: 6 }}>User Records</h1>
      <p style={{ color: "#5b9bd5", fontSize: 14 }}>View detailed individual user profiles and history</p>
    </div>
    <div style={{ background: "#0d1b2a", borderRadius: 16, border: "1px solid #1e3a5a", overflow: "hidden" }}>
      <EmptyState icon="🗂️" title="Data Not Available" subtitle="No user profiles to display at the moment. Individual user records and their detailed activity will appear here once users are added." />
    </div>
  </div>
);

const navItems = [
  { key: "users", label: "All Users", icon: "👥", desc: "View all accounts" },
  { key: "records", label: "Data Records", icon: "📊", desc: "Transaction history" },
  { key: "create", label: "Create User", icon: "➕", desc: "Add new account" },
  { key: "userrecord", label: "User Record", icon: "🗂️", desc: "Individual profiles" },
];

import { useEffect } from "react";

export default function Dashboard() {
  const [active, setActive] = useState("users");
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderPage = () => {
    if (active === "users") return <AllUsers />;
    if (active === "records") return <DataRecord />;
    if (active === "create") return <CreateUser isMobile={isMobile} />;
    if (active === "userrecord") return <UserRecord />;
  };

  return (
    <div style={{
      display: "flex", height: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#040d18", overflow: "hidden", position: "relative"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Mobile Overlay */}
      {isMobile && !collapsed && (
        <div 
          onClick={() => setCollapsed(true)}
          style={{
            position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", 
            zIndex: 40, backdropFilter: "blur(2px)"
          }}
        />
      )}

      {/* Sidebar */}
      <div style={{
        width: collapsed && !isMobile ? 72 : 240,
        background: "#071323",
        borderRight: "1px solid #0e2540",
        display: "flex", flexDirection: "column",
        transition: "all 0.3s ease",
        flexShrink: 0, 
        overflow: "hidden",
        position: isMobile ? "absolute" : "relative",
        height: "100%",
        zIndex: 50,
        left: isMobile && collapsed ? -240 : 0,
        boxShadow: isMobile && !collapsed ? "20px 0 50px rgba(0,0,0,0.5)" : "none"
      }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid #0e2540", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {(!collapsed || isMobile) && <Logo />}
          {collapsed && !isMobile && (
            <img
              src={SMR_LOGO}
              alt="SMR Finserv"
              style={{ height: 36, width: "auto", objectFit: "contain", margin: "0 auto", display: "block" }}
            />
          )}
          {isMobile && (
            <button onClick={() => setCollapsed(true)} style={{ background: "transparent", border: "none", color: "#5b9bd5", fontSize: 24, cursor: "pointer" }}>×</button>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {(!collapsed || isMobile) && <div style={{ color: "#2d5a8a", fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", padding: "8px 8px 4px" }}>Navigation</div>}
          {navItems.map(item => (
            <button key={item.key} onClick={() => { setActive(item.key); if(isMobile) setCollapsed(true); }}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: collapsed && !isMobile ? "14px" : "12px 14px",
                borderRadius: 10, border: "none", cursor: "pointer",
                background: active === item.key ? "linear-gradient(135deg, #1e90ff18, #0050c818)" : "transparent",
                borderLeft: active === item.key ? "3px solid #1e90ff" : "3px solid transparent",
                transition: "all 0.2s", width: "100%", justifyContent: collapsed && !isMobile ? "center" : "flex-start"
              }}
              onMouseEnter={e => { if (active !== item.key) e.currentTarget.style.background = "#0e243a"; }}
              onMouseLeave={e => { if (active !== item.key) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {(!collapsed || isMobile) && (
                <div style={{ textAlign: "left" }}>
                  <div style={{ color: active === item.key ? "#1e90ff" : "#c5d9ec", fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                  <div style={{ color: "#3d6a9a", fontSize: 11 }}>{item.desc}</div>
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Admin Info */}
        <div style={{ padding: "16px 14px", borderTop: "1px solid #0e2540" }}>
          {collapsed && !isMobile ? (
            <div style={{
              width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#1e90ff,#0050c8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 14, fontWeight: 700, margin: "0 auto"
            }}>A</div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#1e90ff,#0050c8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 14, fontWeight: 700, flexShrink: 0
              }}>A</div>
              <div>
                <div style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>Admin User</div>
                <div style={{ color: "#3d6a9a", fontSize: 11 }}>Super Administrator</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{
          background: "#071323", borderBottom: "1px solid #0e2540",
          padding: isMobile ? "0 16px" : "0 28px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 16 }}>
            <button onClick={() => setCollapsed(p => !p)}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "#5b9bd5", fontSize: 20, padding: 4 }}>
              ☰
            </button>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: isMobile ? 14 : 15 }}>
                {navItems.find(n => n.key === active)?.label}
              </div>
              {!isMobile && (
                <div style={{ color: "#3d6a9a", fontSize: 11 }}>
                  {navItems.find(n => n.key === active)?.desc}
                </div>
              )}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 16 }}>
            {!isMobile && (
              <div style={{ color: "#5b9bd5", fontSize: 12 }}>
                📅 {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
              </div>
            )}
            <div style={{
              background: "#0d1b2a", border: "1px solid #1e3a5a", borderRadius: 8,
              padding: isMobile ? "6px 10px" : "8px 16px", color: "#8badc7", fontSize: 12, fontWeight: 500, cursor: "pointer"
            }}>🔔 {isMobile ? "3" : "3 Notifications"}</div>
            {!isMobile && (
              <div style={{
                background: "linear-gradient(135deg,#1e90ff,#0050c8)", borderRadius: 8,
                padding: "8px 16px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer"
              }}>⚙️ Settings</div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? 16 : 28 }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}