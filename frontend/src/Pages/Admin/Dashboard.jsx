import { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";

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
        filter: "drop-shadow(0 2px 8px rgba(30,144,255,0.15))"
      }}
    />
  </div>
);

const Badge = ({ status }) => {
  const colors = {
    Active: { bg: "#dcfce7", color: "#15803d", border: "#bbf7d0" },
    Inactive: { bg: "#f1f5f9", color: "#64748b", border: "#e2e8f0" },
    Pending: { bg: "#fef3c7", color: "#b45309", border: "#fde68a" },
    Completed: { bg: "#dcfce7", color: "#15803d", border: "#bbf7d0" },
    Failed: { bg: "#fee2e2", color: "#b91c1c", border: "#fecaca" },
    Enterprise: { bg: "#e0f2fe", color: "#0369a1", border: "#bae6fd" },
    Premium: { bg: "#f3e8ff", color: "#7e22ce", border: "#e9d5ff" },
    Basic: { bg: "#f3f4f6", color: "#4b5563", border: "#e5e7eb" },
    Admin: { bg: "#fdf4ff", color: "#a21caf", border: "#fae8ff" },
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
      background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 36, marginBottom: 24,
      boxShadow: "0 8px 32px rgba(30,144,255,0.05)"
    }}>{icon}</div>
    <div style={{ color: "#1e293b", fontSize: 18, fontWeight: 700, marginBottom: 10, fontFamily: "'Playfair Display', serif" }}>{title}</div>
    <div style={{ color: "#64748b", fontSize: 13, maxWidth: 320, lineHeight: 1.6 }}>{subtitle}</div>
  </div>
);

const AllUsers = ({ isMobile, users }) => (
  <div>
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ color: "#1e293b", fontSize: isMobile ? 22 : 26, fontWeight: 800, fontFamily: "'Playfair Display', serif", marginBottom: 6 }}>All Users</h1>
      <p style={{ color: "#64748b", fontSize: 13 }}>Manage and monitor all registered users</p>
    </div>
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
      <div style={{ padding: isMobile ? "16px" : "20px 24px", borderBottom: "1px solid #e2e8f0" }}>
        <span style={{ color: "#1e293b", fontWeight: 700, fontSize: 15 }}>User Directory</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["User", "Email", "Phone", "Role", "Password"].map(h => (
                <th key={h} style={{ padding: "12px 20px", color: "#64748b", fontSize: 11, fontWeight: 700, textAlign: "left", letterSpacing: "1px", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "12px 20px", color: "#1e293b", fontSize: 13 }}>{user.name}</td>
                <td style={{ padding: "12px 20px", color: "#475569", fontSize: 13 }}>{user.email}</td>
                <td style={{ padding: "12px 20px", color: "#475569", fontSize: 13 }}>{user.phone}</td>
                <td style={{ padding: "12px 20px" }}><Badge status={user.role || "User"} /></td>
                <td style={{ padding: "12px 20px", color: "#475569", fontSize: 13 }}>{user.password}</td>
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

const DataRecord = ({ isMobile, currentUser, recordToEdit, onFinished }) => {
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
    productName: "",
    plan: "",
    paymentType: "",
    folioNo: "",
    amount: "",
    paymentDate: "",
    nextPaymentDate: ""
  };

  const [form, setForm] = useState(initialFormState);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [policyFile, setPolicyFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (recordToEdit) {
      setForm(recordToEdit);
    } else {
      setForm(initialFormState);
    }
  }, [recordToEdit]);

  const uploadFile = async (file, path) => {
    if (!file) return "";
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isMF = form.category === "MutualFund";
      const idValue = isMF ? form.folioNo : form.policyNo;
      const fileId = idValue || Date.now();
      const timestamp = Date.now();
      
      const [aadhaarUrl, panUrl, policyUrl] = await Promise.all([
        uploadFile(aadhaarFile, `dataRecords/${form.category}/${timestamp}_${fileId}_aadhaar`),
        uploadFile(panFile, `dataRecords/${form.category}/${timestamp}_${fileId}_pan`),
        uploadFile(policyFile, `dataRecords/${form.category}/${timestamp}_${fileId}_policy`)
      ]);

      const dataToSave = {
        ...form,
        addedBy: currentUser?.id || "admin",
        addedByName: currentUser?.name || "Super Admin",
      };

      if (aadhaarUrl) dataToSave.aadhaarPhoto = aadhaarUrl;
      if (panUrl) dataToSave.panPhoto = panUrl;
      if (policyUrl) dataToSave.policyPhoto = policyUrl;

      if (recordToEdit) {
        await updateDoc(doc(db, "dataEntries", recordToEdit.id), {
          ...dataToSave,
          updatedAt: serverTimestamp()
        });
        toast.success("Record Updated Successfully!");
        if (onFinished) onFinished();
      } else {
        await addDoc(collection(db, "dataEntries"), {
          ...dataToSave,
          createdAt: serverTimestamp()
        });
        toast.success("Record Added Successfully!");
        setForm(initialFormState);
        setAadhaarFile(null);
        setPanFile(null);
        setPolicyFile(null);
      }
    } catch (e) {
      toast.error(`Error ${recordToEdit ? "updating" : "adding"} record: ` + e.message);
    }
    setLoading(false);
  };

  const inputStyle = { background: "#fff", border: "1px solid #cbd5e1", borderRadius: 8, padding: 10, color: "#1e293b", outline: "none", width: "100%" };
  const labelStyle = { fontSize: 12, color: "#475569", marginBottom: 5, display: "block" };

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
      <h1 style={{ color: "#1e293b", fontSize: isMobile ? 22 : 26, fontWeight: 800, marginBottom: 20 }}>Fill Data Records</h1>
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: isMobile ? 20 : 32, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ marginBottom: 25 }}>
          <label style={labelStyle}>Insurance Category</label>
          <select value={form.category} onChange={e => setForm({ ...initialFormState, category: e.target.value })} style={{ ...inputStyle, fontSize: 16, fontWeight: 700, borderColor: "#1e90ff" }}>
            <option value="Motor">Motor Insurance</option>
            <option value="Health">Health Insurance</option>
            <option value="SME">SME Insurance</option>
            <option value="Life">Life Insurance</option>
            <option value="MutualFund">Mutual Fund</option>
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

          {form.category === "Life" && (
            <>
              {renderField("Plan", "plan")}
              {renderField("Sum Assured", "sumAssured")}
              {renderField("Tenure", "tenure")}
              {renderField("Risk Date", "riskDate", "date")}
              {renderField("Payment Type", "paymentType", "select", ["Monthly", "Quarterly", "Half-Yearly", "Yearly", "Single"])}
            </>
          )}

          {form.category === "MutualFund" && (
            <>
              {renderField("Folio No", "folioNo")}
              {renderField("Fund Name", "productName")}
              {renderField("Tenure", "tenure")}
              {renderField("Amount", "amount")}
              {renderField("Payment Date", "paymentDate", "date")}
              {renderField("Next Payment Date", "nextPaymentDate", "date")}
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
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={labelStyle}>Policy Document</label>
            <input type="file" accept="image/*,application/pdf" onChange={e => setPolicyFile(e.target.files[0])} style={inputStyle} />
          </div>

          <button type="submit" disabled={loading} style={{ gridColumn: "1 / -1", background: "#1e90ff", color: "#fff", border: "none", borderRadius: 8, padding: 16, fontWeight: 700, fontSize: 16, cursor: loading ? "not-allowed" : "pointer", marginTop: 10 }}>
            {loading ? "Uploading & Saving..." : "Save Record"}
          </button>
        </form>
      </div>
    </div>
  );
};

const UserRecord = ({ isMobile, currentUser }) => {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("Motor");
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "dataEntries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEntries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const filteredEntries = entries.filter(ent => ent.category === filter);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteDoc(doc(db, "dataEntries", id));
        toast.success("Record deleted successfully!");
      } catch (e) {
        toast.error("Error deleting record: " + e.message);
      }
    }
  };

  const motorHeaders = ["SL", "Policy No", "Make", "Model", "IMD Code", "Mobile No", "Name", "Company", "Vehicle Type", "Policy Type", "Risk Date", "End Date", "OD", "TP", "Net Prem", "Prem", "Payout", "Co%", "Remarks", "Actions"];
  const healthHeaders = ["SL", "Policy No", "Company", "Business Type", "IMD Code", "Name", "Sum Assured", "Family", "Bonus", "Tenure", "Risk Date", "End Date", "Net Prem", "Prem", "Payout", "Co%", "Remarks", "Actions"];
  const smeHeaders = ["SL", "Policy No", "Company", "Type", "IMD Code", "Product", "Name", "Tenure", "Sum Assured", "End Date", "Net Prem", "Prem", "Payout", "Co%", "Remarks", "Actions"];
  const lifeHeaders = ["SL", "Policy No", "Company", "Plan", "IMD Code", "Name", "Sum Assured", "Tenure", "Risk Date", "End Date", "Payment Type", "Net Prem", "Prem", "Payout", "Co%", "Remarks", "Actions"];
  const mfHeaders = ["SL", "Folio No", "Company", "Fund Name", "IMD Code", "Name", "Tenure", "Amount", "Payment Date", "Next Payment", "Net Prem", "Prem", "Payout", "Co%", "Remarks", "Actions"];

  const getHeaders = () => {
    if (filter === "Motor") return motorHeaders;
    if (filter === "Health") return healthHeaders;
    if (filter === "SME") return smeHeaders;
    if (filter === "Life") return lifeHeaders;
    if (filter === "MutualFund") return mfHeaders;
    return [];
  };

  const renderCell = (val) => (
    <td style={{ padding: "12px 15px", color: "#1e293b", fontSize: 12, borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" }}>
      {val || "-"}
    </td>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 20, flexWrap: "wrap" }}>
        <h1 style={{ color: "#1e293b", fontSize: isMobile ? 22 : 26, fontWeight: 800 }}>User Record View</h1>
        <div style={{ display: "flex", gap: 10 }}>
          {["Motor", "Health", "SME", "Life", "MutualFund"].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #e2e8f0", background: filter === cat ? "#1e90ff" : "#f1f5f9", color: filter === cat ? "#fff" : "#475569", cursor: "pointer", fontWeight: 600 }}>{cat}</button>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {getHeaders().map(h => (
                  <th key={h} style={{ padding: "12px 15px", color: "#64748b", fontSize: 10, fontWeight: 700, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{h}</th>
                ))}
                <th style={{ padding: "12px 15px", color: "#64748b", fontSize: 10, fontWeight: 700, textAlign: "left", textTransform: "uppercase" }}>Docs</th>
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
                  {filter === "Life" && (
                    <>
                      {renderCell(ent.sl)}
                      {renderCell(ent.policyNo)}
                      {renderCell(ent.company)}
                      {renderCell(ent.plan)}
                      {renderCell(ent.imdCode)}
                      {renderCell(ent.name)}
                      {renderCell(ent.sumAssured)}
                      {renderCell(ent.tenure)}
                      {renderCell(ent.riskDate)}
                      {renderCell(ent.endDate)}
                      {renderCell(ent.paymentType)}
                      {renderCell(ent.netPrem)}
                      {renderCell(ent.prem)}
                      {renderCell(ent.payout)}
                      {renderCell(ent.companyPercentage)}
                      {renderCell(ent.remarks)}
                    </>
                  )}
                  {filter === "MutualFund" && (
                    <>
                      {renderCell(ent.sl)}
                      {renderCell(ent.folioNo)}
                      {renderCell(ent.company)}
                      {renderCell(ent.productName)}
                      {renderCell(ent.imdCode)}
                      {renderCell(ent.name)}
                      {renderCell(ent.tenure)}
                      {renderCell(ent.amount)}
                      {renderCell(ent.paymentDate)}
                      {renderCell(ent.nextPaymentDate)}
                      {renderCell(ent.netPrem)}
                      {renderCell(ent.prem)}
                      {renderCell(ent.payout)}
                      {renderCell(ent.companyPercentage)}
                      {renderCell(ent.remarks)}
                    </>
                  )}
                  <td style={{ padding: "12px 15px", borderBottom: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button 
                        onClick={() => setEditingRecord(ent)}
                        style={{ background: "#1e90ff", color: "#fff", border: "none", borderRadius: 4, padding: "4px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}
                      >
                        EDIT
                      </button>
                      <button 
                        onClick={() => handleDelete(ent.id)}
                        style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 4, padding: "4px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                  <td style={{ padding: "12px 15px", borderBottom: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      {ent.aadhaarPhoto && <a href={ent.aadhaarPhoto} target="_blank" rel="noreferrer" style={{ color: "#1e90ff", fontSize: 10, fontWeight: 700 }}>AADHAAR</a>}
                      {ent.panPhoto && <a href={ent.panPhoto} target="_blank" rel="noreferrer" style={{ color: "#1e90ff", fontSize: 10, fontWeight: 700 }}>PAN</a>}
                      {ent.policyPhoto && <a href={ent.policyPhoto} target="_blank" rel="noreferrer" style={{ color: "#1e90ff", fontSize: 10, fontWeight: 700 }}>POLICY</a>}
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

      {editingRecord && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(4px)" }}>
          <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 1000, maxHeight: "90vh", overflowY: "auto", position: "relative", border: "1px solid #e2e8f0", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
            <button 
              onClick={() => setEditingRecord(null)} 
              style={{ position: "absolute", top: 20, right: 20, background: "transparent", border: "none", color: "#1e293b", fontSize: 24, cursor: "pointer", zIndex: 1 }}
            >
              &times;
            </button>
            <div style={{ padding: isMobile ? 20 : 40 }}>
              <DataRecord 
                isMobile={isMobile} 
                currentUser={currentUser} 
                recordToEdit={editingRecord} 
                onFinished={() => setEditingRecord(null)} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CreateUser = ({ isMobile }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "User", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "users"), { ...form, createdAt: serverTimestamp() });
      setForm({ name: "", email: "", phone: "", role: "User", password: "" });
      toast.success("User created successfully!");
    } catch (e) { toast.error(e.message); }
    setLoading(false);
  };

  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: isMobile ? 20 : 32, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
       <h1 style={{ color: "#1e293b", fontSize: isMobile ? 20 : 22, marginBottom: 20 }}>Create New User</h1>
       <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name" style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 10, padding: 12, color: "#1e293b" }} />
          <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 10, padding: 12, color: "#1e293b" }} />
          <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone" style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 10, padding: 12, color: "#1e293b" }} />
          <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 10, padding: 12, color: "#1e293b" }} />
          <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 10, padding: 12, color: "#1e293b" }}>
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
    else toast.error("Invalid credentials (Try: admin@smr.com / admin123)");
  };

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", padding: 20 }}>
      <Toaster position="top-right" reverseOrder={false} />
      <div style={{ background: "#fff", padding: "40px 24px", borderRadius: 20, border: "1px solid #e2e8f0", width: "100%", maxWidth: 350, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Logo />
        </div>
        <h2 style={{ color: "#1e293b", marginTop: 24, fontSize: 24, fontWeight: 700, textAlign: "center" }}>Admin Login</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 24 }}>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 10, padding: 12, color: "#1e293b", outline: "none" }} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 10, padding: 12, color: "#1e293b", outline: "none" }} />
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
    <div style={{ display: "flex", height: "100vh", background: "#f8fafc", color: "#1e293b", position: "relative", overflow: "hidden" }}>
      <Toaster position="top-right" reverseOrder={false} />
      {/* Sidebar Overlay for Mobile */}
      {isMobile && !collapsed && (
        <div 
          onClick={() => setCollapsed(true)}
          style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 999, backdropFilter: "blur(2px)" }}
        />
      )}

      {/* Sidebar */}
      <div style={{ 
        width: isMobile ? 260 : (collapsed ? 80 : 260), 
        background: "#fff", 
        borderRight: "1px solid #e2e8f0", 
        transition: "0.3s ease-in-out",
        position: isMobile ? "fixed" : "relative",
        left: isMobile && collapsed ? -260 : 0,
        height: "100vh",
        zIndex: 1000,
      }}>
        <div style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {(!collapsed || isMobile) ? <Logo /> : <span style={{ fontSize: 24, fontWeight: 900, color: "#1e90ff" }}>S</span>}
          {isMobile && <button onClick={() => setCollapsed(true)} style={{ background: "transparent", border: "none", color: "#64748b", fontSize: 24, cursor: "pointer" }}>&times;</button>}
        </div>
        <nav style={{ padding: 10 }}>
          {filteredNavItems.map(item => (
            <button key={item.key} onClick={() => { setActive(item.key); if (isMobile) setCollapsed(true); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 15px", marginBottom: 5, background: active === item.key ? "#1e90ff11" : "transparent", border: "none", color: active === item.key ? "#1e90ff" : "#64748b", cursor: "pointer", borderRadius: 8, transition: "0.2s" }}>
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
        <header style={{ height: 64, borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "0 16px" : "0 24px", background: "#fff" }}>
           <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button onClick={() => setCollapsed(!collapsed)} style={{ background: "transparent", border: "none", color: "#1e293b", cursor: "pointer", fontSize: 20, padding: 8, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>☰</button>
              <h2 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{navItems.find(n => n.key === active)?.label}</h2>
           </div>
           <div style={{ textAlign: "right", minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{currentUser.name}</div>
                <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{currentUser.role}</div>
           </div>
        </header>
        <main style={{ flex: 1, padding: isMobile ? 16 : 24, overflowY: "auto", background: "#f8fafc" }}>
          {active === "users" && <AllUsers isMobile={isMobile} users={users} />}
          {active === "records" && <DataRecord isMobile={isMobile} currentUser={currentUser} />}
          {active === "create" && <CreateUser isMobile={isMobile} />}
          {active === "userrecord" && <UserRecord isMobile={isMobile} currentUser={currentUser} />}
        </main>
      </div>
    </div>
  );
}
