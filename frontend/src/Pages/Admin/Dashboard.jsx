import { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const SMR_LOGO = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAFpArQDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAYHBAUIAwIB/8QAVRAAAgEDAgIFBQgNCAkFAAMAAAECAwQFBhEhMQcSQVFxE2GBkdEUIjZ0k6GxshUWFyMyM0JSVWJzs8EkNVRyg6LS8CUmREVjZIKU4TRDU5LxhKPC/8QAHAEBAAIDAQEBAAAAAAAAAAAAAAUGAQMEAgcI/8QAPREAAgEDAQMICAUEAgIDAAAAAAECAwQFERIhMQYiNEFRcYGxBxMUUmGRocEVMjPR4RYjQvA1cjZDgpLx/9oADAMBAAIRAxEAPwDjIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkml9GZnOyhUp0fc9rJ8a9VbLbvS7T3TpyqS2YLVnidSNOO1J6IjsIynOMIRcpSe0YpbtvuJ5pXo3v7+MLnLTdlbvj5NfjX6/fnLA0no3E6ej5SlB3F3ttKvUS39C7ESQsdlguEq/yX3ZAXeb4xoLxf2NVj9PYaxxcsZb2NJW0ltOMl1uv523xb/yuwg2q+jGnLr3OAqODe7dtVbaX9WXPw3LOBMV8bb1obLilpw04kVQyFejPaUm+3Xecy5CzurC6na3lCdGtDnGS29PgY50fn8FjM5aO3yFtGrHmpJ7Sg+9P/O/gVNqvo7ymLlOvj/5baLitvxkV512+gq15iK1vzlzo/D7lktMpSuOa90iEg/ZJxk4yTTXBp9h+EUSYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPeytLm9uI29pQqV6snsowjuxxHA8DY4LC5LNXSt8dbSqy7ZN7Rj523yJ7pToxm+pc5+ooppSVvSlx8JPb5l6yzLCztbC2hbWlGFGlCOyUI7ImrP";

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
    Admin: { bg: "#2a0a2a", color: "#ff00ff", border: "#ff00ff40" },
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

const AllUsers = ({ isMobile, users }) => (
  <div>
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ color: "#fff", fontSize: isMobile ? 22 : 26, fontWeight: 800, fontFamily: "'Playfair Display', serif", marginBottom: 6 }}>All Users</h1>
      <p style={{ color: "#5b9bd5", fontSize: 13 }}>Manage and monitor all registered users</p>
    </div>
    <div style={{ background: "#0d1b2a", borderRadius: 16, border: "1px solid #1e3a5a", overflow: "hidden" }}>
      <div style={{ padding: isMobile ? "16px" : "20px 24px", borderBottom: "1px solid #1e3a5a" }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>User Directory</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
          <thead>
            <tr style={{ background: "#071323" }}>
              {["User", "Email", "Phone", "Role", "Password"].map(h => (
                <th key={h} style={{ padding: "12px 20px", color: "#5b9bd5", fontSize: 11, fontWeight: 700, textAlign: "left", letterSpacing: "1px", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #1e3a5a" }}>
                <td style={{ padding: "12px 20px", color: "#fff", fontSize: 13 }}>{user.name}</td>
                <td style={{ padding: "12px 20px", color: "#8badc7", fontSize: 13 }}>{user.email}</td>
                <td style={{ padding: "12px 20px", color: "#8badc7", fontSize: 13 }}>{user.phone}</td>
                <td style={{ padding: "12px 20px" }}><Badge status={user.role || "User"} /></td>
                <td style={{ padding: "12px 20px", color: "#8badc7", fontSize: 13 }}>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length === 0 && (
        <EmptyState icon="👥" title="No Users Found" subtitle="Registered users will appear here." />
      )}
    </div>
  </div>
);

const DataRecord = ({ isMobile }) => {
  const [form, setForm] = useState({ txnId: "", userName: "", type: "", category: "", amount: "", date: "" });
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file, path) => {
    if (!file) return "";
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.txnId || !form.userName || !form.amount) return alert("Fill required fields");
    setLoading(true);
    try {
      const aadhaarUrl = await uploadFile(aadhaarFile, `dataRecords/${form.txnId}_aadhaar`);
      const panUrl = await uploadFile(panFile, `dataRecords/${form.txnId}_pan`);

      await addDoc(collection(db, "dataEntries"), {
        ...form,
        aadhaarPhoto: aadhaarUrl,
        panPhoto: panUrl,
        createdAt: serverTimestamp()
      });
      alert("Record Added Successfully!");
      setForm({ txnId: "", userName: "", type: "", category: "", amount: "", date: "" });
      setAadhaarFile(null);
      setPanFile(null);
    } catch (e) {
      alert("Error adding record: " + e.message);
    }
    setLoading(false);
  };

  const inputStyle = { background: "#071323", border: "1px solid #1e3a5a", borderRadius: 8, padding: 10, color: "#fff", outline: "none" };

  return (
    <div>
      <h1 style={{ color: "#fff", fontSize: isMobile ? 22 : 26, fontWeight: 800, marginBottom: 20 }}>Fill Data Records</h1>
      <div style={{ background: "#0d1b2a", borderRadius: 16, border: "1px solid #1e3a5a", padding: isMobile ? 20 : 32 }}>
        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 12, color: "#8badc7" }}>Txn ID</label>
            <input value={form.txnId} onChange={e => setForm({ ...form, txnId: e.target.value })} style={inputStyle} placeholder="TXN12345" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 12, color: "#8badc7" }}>User (Name)</label>
            <input value={form.userName} onChange={e => setForm({ ...form, userName: e.target.value })} style={inputStyle} placeholder="Enter User Name" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 12, color: "#8badc7" }}>Type</label>
            <input value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={inputStyle} placeholder="e.g. Credit" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 12, color: "#8badc7" }}>Category</label>
            <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inputStyle} placeholder="e.g. Loan" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 12, color: "#8badc7" }}>Amount</label>
            <input value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} style={inputStyle} placeholder="5000" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 12, color: "#8badc7" }}>Date</label>
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 12, color: "#8badc7" }}>Aadhaar Card Photo</label>
            <input type="file" accept="image/*" onChange={e => setAadhaarFile(e.target.files[0])} style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 12, color: "#8badc7" }}>Pan Card Photo</label>
            <input type="file" accept="image/*" onChange={e => setPanFile(e.target.files[0])} style={inputStyle} />
          </div>
          <button type="submit" disabled={loading} style={{ gridColumn: isMobile ? "span 1" : "span 2", background: "#1e90ff", color: "#fff", border: "none", borderRadius: 8, padding: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Uploading & Saving..." : "Save Record"}
          </button>
        </form>
      </div>
    </div>
  );
};

const UserRecord = ({ isMobile }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "dataEntries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEntries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1 style={{ color: "#fff", fontSize: isMobile ? 22 : 26, fontWeight: 800, marginBottom: 20 }}>User Record View</h1>
      <div style={{ background: "#0d1b2a", borderRadius: 16, border: "1px solid #1e3a5a", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
            <thead>
              <tr style={{ background: "#071323" }}>
                {["Txn ID", "User", "Type", "Category", "Amount", "Date", "Aadhaar", "PAN"].map(h => (
                  <th key={h} style={{ padding: "12px 20px", color: "#5b9bd5", fontSize: 11, fontWeight: 700, textAlign: "left", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((ent) => (
                <tr key={ent.id} style={{ borderBottom: "1px solid #1e3a5a" }}>
                  <td style={{ padding: "12px 20px", color: "#fff", fontSize: 13 }}>{ent.txnId}</td>
                  <td style={{ padding: "12px 20px", color: "#fff", fontSize: 13 }}>{ent.userName}</td>
                  <td style={{ padding: "12px 20px", color: "#8badc7", fontSize: 13 }}>{ent.type}</td>
                  <td style={{ padding: "12px 20px", color: "#8badc7", fontSize: 13 }}>{ent.category}</td>
                  <td style={{ padding: "12px 20px", color: "#22c55e", fontSize: 13, fontWeight: 700 }}>₹{ent.amount}</td>
                  <td style={{ padding: "12px 20px", color: "#8badc7", fontSize: 13 }}>{ent.date}</td>
                  <td style={{ padding: "12px 20px" }}>
                    {ent.aadhaarPhoto ? <a href={ent.aadhaarPhoto} target="_blank" rel="noreferrer" style={{ color: "#1e90ff", fontSize: 12 }}>View Photo</a> : "N/A"}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    {ent.panPhoto ? <a href={ent.panPhoto} target="_blank" rel="noreferrer" style={{ color: "#1e90ff", fontSize: 12 }}>View Photo</a> : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {entries.length === 0 && (
          <EmptyState icon="🗂️" title="No Records" subtitle="Entries from 'Data Records' will show here." />
        )}
      </div>
    </div>
  );
};

const CreateUser = ({ isMobile }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "User", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (form.name && form.email && form.password) {
      setLoading(true);
      try {
        await addDoc(collection(db, "users"), { ...form, createdAt: serverTimestamp() });
        setForm({ name: "", email: "", phone: "", role: "User", password: "" });
        alert("User created successfully!");
      } catch (e) { alert(e.message); }
      setLoading(false);
    } else alert("Fill required fields");
  };

  return (
    <div style={{ background: "#0d1b2a", borderRadius: 16, border: "1px solid #1e3a5a", padding: isMobile ? 20 : 32 }}>
       <h1 style={{ color: "#fff", fontSize: isMobile ? 20 : 22, marginBottom: 20 }}>Create New User</h1>
       <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name" style={{ background: "#071323", border: "1px solid #1e3a5a", borderRadius: 10, padding: 12, color: "#fff" }} />
          <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" style={{ background: "#071323", border: "1px solid #1e3a5a", borderRadius: 10, padding: 12, color: "#fff" }} />
          <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone" style={{ background: "#071323", border: "1px solid #1e3a5a", borderRadius: 10, padding: 12, color: "#fff" }} />
          <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" style={{ background: "#071323", border: "1px solid #1e3a5a", borderRadius: 10, padding: 12, color: "#fff" }} />
          <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ background: "#071323", border: "1px solid #1e3a5a", borderRadius: 10, padding: 12, color: "#fff" }}>
            <option value="User">Created User (Access: Data Records Only)</option>
            <option value="Admin">Admin (Full Access)</option>
          </select>
       </div>
       <button onClick={handleSubmit} disabled={loading} style={{ marginTop: 24, background: "#1e90ff", color: "#fff", border: "none", borderRadius: 10, padding: "12px 32px", cursor: loading ? "not-allowed" : "pointer", width: isMobile ? "100%" : "auto" }}>
         {loading ? "Creating..." : "Create User"}
       </button>
    </div>
  );
};

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email === "admin@smr.com" && password === "admin123") {
      onLogin({ email, name: "Super Admin", role: "Admin" });
      return;
    }
    const q = query(collection(db, "users"));
    const snapshot = await getDocs(q);
    const user = snapshot.docs.find(d => d.data().email === email && d.data().password === password);
    if (user) onLogin({ id: user.id, ...user.data() });
    else alert("Invalid credentials (Try: admin@smr.com / admin123)");
  };

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#040d18", padding: 20 }}>
      <div style={{ background: "#071323", padding: "40px 24px", borderRadius: 20, border: "1px solid #1e3a5a", width: "100%", maxWidth: 350 }}>
        <Logo />
        <h2 style={{ color: "#fff", marginTop: 24, fontSize: 24, fontWeight: 700 }}>Admin Login</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 24 }}>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ background: "#0d1b2a", border: "1px solid #1e3a5a", borderRadius: 10, padding: 12, color: "#fff", outline: "none" }} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ background: "#0d1b2a", border: "1px solid #1e3a5a", borderRadius: 10, padding: 12, color: "#fff", outline: "none" }} />
          <button onClick={handleLogin} style={{ background: "#1e90ff", color: "#fff", border: "none", borderRadius: 10, padding: 14, cursor: "pointer", fontWeight: 700, marginTop: 8 }}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("adminUser")));
  const [active, setActive] = useState("records");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (currentUser?.role === "Admin") {
        const unsubscribe = onSnapshot(query(collection(db, "users"), orderBy("createdAt", "desc")), (snap) => {
          setUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }
  }, [currentUser]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!currentUser) return <Login onLogin={(u) => { setCurrentUser(u); localStorage.setItem("adminUser", JSON.stringify(u)); }} />;

  const navItems = [
    { key: "users", label: "All Users", icon: "👥", admin: true },
    { key: "records", label: "Data Records", icon: "📊", admin: false },
    { key: "create", label: "Create User", icon: "➕", admin: true },
    { key: "userrecord", label: "User Record", icon: "🗂️", admin: true },
  ];

  const filteredNavItems = currentUser.role === "Admin" ? navItems : navItems.filter(item => !item.admin);

  return (
    <div style={{ display: "flex", height: "100vh", background: "#040d18", color: "#fff", position: "relative", overflow: "hidden" }}>
      {/* Sidebar Overlay for Mobile */}
      {isMobile && !collapsed && (
        <div 
          onClick={() => setCollapsed(true)}
          style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 999, backdropFilter: "blur(2px)" }}
        />
      )}

      {/* Sidebar */}
      <div style={{ 
        width: isMobile ? 260 : (collapsed ? 80 : 260), 
        background: "#071323", 
        borderRight: "1px solid #1e3a5a", 
        transition: "0.3s ease-in-out",
        position: isMobile ? "fixed" : "relative",
        left: isMobile && collapsed ? -260 : 0,
        height: "100vh",
        zIndex: 1000,
      }}>
        <div style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {(!collapsed || isMobile) ? <Logo /> : <span style={{ fontSize: 24, fontWeight: 900, color: "#1e90ff" }}>S</span>}
          {isMobile && <button onClick={() => setCollapsed(true)} style={{ background: "transparent", border: "none", color: "#8badc7", fontSize: 24, cursor: "pointer" }}>&times;</button>}
        </div>
        <nav style={{ padding: 10 }}>
          {filteredNavItems.map(item => (
            <button key={item.key} onClick={() => { setActive(item.key); if (isMobile) setCollapsed(true); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 15px", marginBottom: 5, background: active === item.key ? "#1e90ff22" : "transparent", border: "none", color: active === item.key ? "#1e90ff" : "#8badc7", cursor: "pointer", borderRadius: 8, transition: "0.2s" }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span> {(!collapsed || isMobile) && <span style={{ fontWeight: active === item.key ? 700 : 500 }}>{item.label}</span>}
            </button>
          ))}
          <button onClick={() => { localStorage.removeItem("adminUser"); setCurrentUser(null); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 15px", marginTop: 20, background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", borderRadius: 8 }}>
            <span>🚪</span> {(!collapsed || isMobile) && <span>Logout</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ height: 64, borderBottom: "1px solid #1e3a5a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "0 16px" : "0 24px", background: "#071323" }}>
           <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button onClick={() => setCollapsed(!collapsed)} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: 20, padding: 8, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>☰</button>
              <h2 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{navItems.find(n => n.key === active)?.label}</h2>
           </div>
           <div style={{ textAlign: "right", minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{currentUser.name}</div>
                <div style={{ fontSize: 10, color: "#5b9bd5", textTransform: "uppercase", letterSpacing: "0.5px" }}>{currentUser.role}</div>
           </div>
        </header>
        <main style={{ flex: 1, padding: isMobile ? 16 : 24, overflowY: "auto", background: "#040d18" }}>
          {active === "users" && <AllUsers isMobile={isMobile} users={users} />}
          {active === "records" && <DataRecord isMobile={isMobile} />}
          {active === "create" && <CreateUser isMobile={isMobile} />}
          {active === "userrecord" && <UserRecord isMobile={isMobile} />}
        </main>
      </div>
    </div>
  );
}
