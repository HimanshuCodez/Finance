import { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const SMR_LOGO = "https://i.postimg.cc/Fsbgy6sQ/smr.png";

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

const MOTOR_VEHICLE_TYPES = [
  "CAR", "TWO WHEELER: SCOOTY", "TWO WHEELER: BIKE",
  "GCV: 0-2500KG", "GCV: 2500-3500KG", "GCV: 3500-7500KG",
  "GCV: 7500-12000KG", "GCV: 12000-16000KG", "GCV: 16000-55000KG",
  "PCV: SCHOOL BUS", "PCV: STAFF BUS", "PCV: PASSENGER BUS", "PCV: TAXI",
  "MISC D: TRACTOR", "MISC D: CRANE", "MISC D: OTHER"
];

const HEALTH_FAMILY_MEMBERS = [
  "1 Adult", "2 Adult", "2 Adult 1 child", "2 Adult 2 Child",
  "2 Adult 3 child", "1 Adult 1 Child", "1 Adult 2 child"
];

const DataRecord = ({ isMobile }) => {
  const initialFormState = {
    category: "Motor",
    sl: "",
    policyNo: "",
    make: "",
    model: "",
    imdCode: "",
    mobileNo: "",
    name: "",
    company: "",
    vehicleType: "",
    policyType: "",
    riskDate: "",
    endDate: "",
    od: "",
    tp: "",
    netPrem: "",
    prem: "",
    payout: "",
    companyPercentage: "",
    remarks: "",
    subType: "", // Business Type / Insurance Type
    sumAssured: "",
    familyMembers: "",
    bonus: "",
    tenure: "",
    productName: ""
  };

  const [form, setForm] = useState(initialFormState);
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
    if (!form.policyNo || !form.name || !form.prem) return alert("Fill required fields (Policy No, Name, Prem)");
    setLoading(true);
    try {
      const fileId = form.policyNo || Date.now();
      const aadhaarUrl = await uploadFile(aadhaarFile, `dataRecords/${fileId}_aadhaar`);
      const panUrl = await uploadFile(panFile, `dataRecords/${fileId}_pan`);

      await addDoc(collection(db, "dataEntries"), {
        ...form,
        aadhaarPhoto: aadhaarUrl,
        panPhoto: panUrl,
        createdAt: serverTimestamp()
      });
      alert("Record Added Successfully!");
      setForm(initialFormState);
      setAadhaarFile(null);
      setPanFile(null);
    } catch (e) {
      alert("Error adding record: " + e.message);
    }
    setLoading(false);
  };

  const inputStyle = { background: "#071323", border: "1px solid #1e3a5a", borderRadius: 8, padding: 10, color: "#fff", outline: "none", width: "100%" };
  const labelStyle = { fontSize: 12, color: "#8badc7", marginBottom: 5, display: "block" };

  const renderField = (label, name, type = "text", options = null) => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>{label}</label>
      {options ? (
        <select value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} style={inputStyle}>
          <option value="">Select {label}</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input type={type} value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} style={inputStyle} placeholder={`Enter ${label}`} />
      )}
    </div>
  );

  return (
    <div>
      <h1 style={{ color: "#fff", fontSize: isMobile ? 22 : 26, fontWeight: 800, marginBottom: 20 }}>Fill Data Records</h1>
      <div style={{ background: "#0d1b2a", borderRadius: 16, border: "1px solid #1e3a5a", padding: isMobile ? 20 : 32 }}>
        <div style={{ marginBottom: 25 }}>
          <label style={labelStyle}>Insurance Category</label>
          <select value={form.category} onChange={e => setForm({ ...initialFormState, category: e.target.value })} style={{ ...inputStyle, fontSize: 16, fontWeight: 700, borderColor: "#1e90ff" }}>
            <option value="Motor">Motor Insurance</option>
            <option value="Health">Health Insurance</option>
            <option value="SME">SME Insurance</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 20 }}>
          {renderField("SL", "sl")}
          {renderField("Policy No", "policyNo")}
          {renderField("IMD Code", "imdCode")}
          {renderField("Name", "name")}
          {renderField(form.category === "Motor" ? "Company" : "Insurance Company", "company")}
          
          {form.category === "Motor" && (
            <>
              {renderField("Make", "make")}
              {renderField("Model", "model")}
              {renderField("Mobile No", "mobileNo")}
              {renderField("Vehicle Type", "vehicleType", "select", MOTOR_VEHICLE_TYPES)}
              {renderField("Policy Type", "policyType", "select", ["COMPREHENSIVE", "SAOD", "THIRD PARTY"])}
              {renderField("Risk Date", "riskDate", "date")}
              {renderField("OD", "od")}
              {renderField("TP", "tp")}
            </>
          )}

          {form.category === "Health" && (
            <>
              {renderField("Business Type", "subType", "select", ["New", "Renewal", "Port"])}
              {renderField("Sum Assured", "sumAssured")}
              {renderField("Family Members", "familyMembers", "select", HEALTH_FAMILY_MEMBERS)}
              {renderField("Bonus", "bonus")}
              {renderField("Tenure", "tenure")}
              {renderField("Risk Date", "riskDate", "date")}
            </>
          )}

          {form.category === "SME" && (
            <>
              {renderField("Insurance Type", "subType", "select", ["New", "Renewal"])}
              {renderField("Product Name", "productName")}
              {renderField("Tenure", "tenure")}
              {renderField("Sum Assured", "sumAssured")}
            </>
          )}

          {renderField("End Date", "endDate", "date")}
          {renderField("Net Prem", "netPrem")}
          {renderField("Prem", "prem")}
          {renderField("Payout", "payout")}
          {renderField("Company %", "companyPercentage")}
          <div style={{ gridColumn: isMobile ? "span 1" : "span 2" }}>
            {renderField("Remarks", "remarks")}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={labelStyle}>Aadhaar Card Photo</label>
            <input type="file" accept="image/*" onChange={e => setAadhaarFile(e.target.files[0])} style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={labelStyle}>Pan Card Photo</label>
            <input type="file" accept="image/*" onChange={e => setPanFile(e.target.files[0])} style={inputStyle} />
          </div>

          <button type="submit" disabled={loading} style={{ gridColumn: "1 / -1", background: "#1e90ff", color: "#fff", border: "none", borderRadius: 8, padding: 16, fontWeight: 700, fontSize: 16, cursor: loading ? "not-allowed" : "pointer", marginTop: 10 }}>
            {loading ? "Uploading & Saving..." : `Save ${form.category} Record`}
          </button>
        </form>
      </div>
    </div>
  );
};

const UserRecord = ({ isMobile }) => {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("Motor");

  useEffect(() => {
    const q = query(collection(db, "dataEntries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEntries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const filteredEntries = entries.filter(ent => ent.category === filter);

  const motorHeaders = ["SL", "Policy No", "Make", "Model", "IMD Code", "Mobile No", "Name", "Company", "Vehicle Type", "Policy Type", "Risk Date", "End Date", "OD", "TP", "Net Prem", "Prem", "Payout", "Co%", "Remarks"];
  const healthHeaders = ["SL", "Policy No", "Company", "Business Type", "IMD Code", "Name", "Sum Assured", "Family", "Bonus", "Tenure", "Risk Date", "End Date", "Net Prem", "Prem", "Payout", "Co%", "Remarks"];
  const smeHeaders = ["SL", "Policy No", "Company", "Type", "IMD Code", "Product", "Name", "Tenure", "Sum Assured", "End Date", "Net Prem", "Prem", "Payout", "Co%", "Remarks"];

  const getHeaders = () => {
    if (filter === "Motor") return motorHeaders;
    if (filter === "Health") return healthHeaders;
    return smeHeaders;
  };

  const renderCell = (val) => (
    <td style={{ padding: "12px 15px", color: "#fff", fontSize: 12, borderBottom: "1px solid #1e3a5a", whiteSpace: "nowrap" }}>
      {val || "-"}
    </td>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 20, flexWrap: "wrap" }}>
        <h1 style={{ color: "#fff", fontSize: isMobile ? 22 : 26, fontWeight: 800 }}>User Record View</h1>
        <div style={{ display: "flex", gap: 10 }}>
          {["Motor", "Health", "SME"].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #1e3a5a", background: filter === cat ? "#1e90ff" : "#0d1b2a", color: "#fff", cursor: "pointer", fontWeight: 600 }}>{cat}</button>
          ))}
        </div>
      </div>

      <div style={{ background: "#0d1b2a", borderRadius: 16, border: "1px solid #1e3a5a", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#071323" }}>
                {getHeaders().map(h => (
                  <th key={h} style={{ padding: "12px 15px", color: "#5b9bd5", fontSize: 10, fontWeight: 700, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{h}</th>
                ))}
                <th style={{ padding: "12px 15px", color: "#5b9bd5", fontSize: 10, fontWeight: 700, textAlign: "left", textTransform: "uppercase" }}>Docs</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((ent) => (
                <tr key={ent.id}>
                  {filter === "Motor" && (
                    <>
                      {renderCell(ent.sl)}
                      {renderCell(ent.policyNo)}
                      {renderCell(ent.make)}
                      {renderCell(ent.model)}
                      {renderCell(ent.imdCode)}
                      {renderCell(ent.mobileNo)}
                      {renderCell(ent.name)}
                      {renderCell(ent.company)}
                      {renderCell(ent.vehicleType)}
                      {renderCell(ent.policyType)}
                      {renderCell(ent.riskDate)}
                      {renderCell(ent.endDate)}
                      {renderCell(ent.od)}
                      {renderCell(ent.tp)}
                      {renderCell(ent.netPrem)}
                      {renderCell(ent.prem)}
                      {renderCell(ent.payout)}
                      {renderCell(ent.companyPercentage)}
                      {renderCell(ent.remarks)}
                    </>
                  )}
                  {filter === "Health" && (
                    <>
                      {renderCell(ent.sl)}
                      {renderCell(ent.policyNo)}
                      {renderCell(ent.company)}
                      {renderCell(ent.subType)}
                      {renderCell(ent.imdCode)}
                      {renderCell(ent.name)}
                      {renderCell(ent.sumAssured)}
                      {renderCell(ent.familyMembers)}
                      {renderCell(ent.bonus)}
                      {renderCell(ent.tenure)}
                      {renderCell(ent.riskDate)}
                      {renderCell(ent.endDate)}
                      {renderCell(ent.netPrem)}
                      {renderCell(ent.prem)}
                      {renderCell(ent.payout)}
                      {renderCell(ent.companyPercentage)}
                      {renderCell(ent.remarks)}
                    </>
                  )}
                  {filter === "SME" && (
                    <>
                      {renderCell(ent.sl)}
                      {renderCell(ent.policyNo)}
                      {renderCell(ent.company)}
                      {renderCell(ent.subType)}
                      {renderCell(ent.imdCode)}
                      {renderCell(ent.productName)}
                      {renderCell(ent.name)}
                      {renderCell(ent.tenure)}
                      {renderCell(ent.sumAssured)}
                      {renderCell(ent.endDate)}
                      {renderCell(ent.netPrem)}
                      {renderCell(ent.prem)}
                      {renderCell(ent.payout)}
                      {renderCell(ent.companyPercentage)}
                      {renderCell(ent.remarks)}
                    </>
                  )}
                  <td style={{ padding: "12px 15px", borderBottom: "1px solid #1e3a5a" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      {ent.aadhaarPhoto && <a href={ent.aadhaarPhoto} target="_blank" rel="noreferrer" style={{ color: "#1e90ff", fontSize: 10, fontWeight: 700 }}>AADHAAR</a>}
                      {ent.panPhoto && <a href={ent.panPhoto} target="_blank" rel="noreferrer" style={{ color: "#1e90ff", fontSize: 10, fontWeight: 700 }}>PAN</a>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredEntries.length === 0 && (
          <EmptyState icon="🗂️" title="No Records" subtitle={`No ${filter} insurance records found.`} />
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
    { key: "create", label: "Create User", icon: "➕", admin: true },
    { key: "records", label: "Record Data", icon: "📊", admin: false },
    { key: "userrecord", label: "Find Data", icon: "🗂️", admin: true },
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
