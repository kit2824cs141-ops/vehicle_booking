import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [drivers, setDrivers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // ======================
  // FETCH DATA
  // ======================
  const fetchDrivers = async () => {
    const res = await axios.get("http://localhost:5000/drivers");
    setDrivers(res.data);
  };

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:5000/rides");
    setBookings(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchDrivers();
    fetchBookings();
    fetchUsers();

    const interval = setInterval(() => {
      fetchDrivers();
      fetchBookings();
      fetchUsers();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ======================
  // ADD DRIVER
  // ======================
  const addDriver = async () => {
    if (!name || !phone) return;

    await axios.post("http://localhost:5000/add-driver", { name, phone });

    setName("");
    setPhone("");
    fetchDrivers();
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>🛠 Admin Dashboard</h2>
        <div style={styles.subtitle}>Cab Management System</div>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {/* ADD DRIVER */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Add Driver</h3>

          <input
            style={styles.input}
            placeholder="Driver Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button style={styles.button} onClick={addDriver}>
            + Add Driver
          </button>
        </div>

        {/* DRIVERS */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Drivers</h3>
          {drivers.map((d) => (
            <div key={d._id} style={styles.driverRow}>
              <div style={styles.driverInfo}>
                <div style={styles.driverName}>{d.name}</div>
                <div style={styles.driverPhone}>{d.phone}</div>
              </div>
              <span
                style={{
                  ...styles.badge,
                  background: d.status === "FREE" ? "#22c55e" : "#ef4444",
                }}
              >
                {d.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* BOOKINGS */}
      <div style={{ ...styles.card, marginTop: 35 }}>
        <h3 style={styles.sectionTitle}>Bookings</h3>
        {bookings.map((b) => (
          <div key={b._id} style={styles.booking}>
            <div>
              <div style={styles.bookingTitle}>
                {b.pickup} → {b.drop}
              </div>
              <div style={styles.meta}>
                {b.vehicle} • {b.distanceKm.toFixed(2)} km
              </div>
              <div style={styles.meta}>Driver: {b.driverId?.name || "—"}</div>
               
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={styles.price}>₹{b.price}</div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: b.status === "ONGOING" ? "#facc15" : "#22c55e",
                }}
              >
                {b.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* USERS */}
      <div style={{ ...styles.card, marginTop: 35 }}>
        <h3 style={styles.sectionTitle}>Registered Users</h3>
        {users.map((u) => (
          <div key={u._id} style={styles.driverRow}>
            <div style={styles.driverInfo}>
              <div style={styles.driverName}>
                {u.name || u.email.split("@")[0]}
              </div>
              <div style={styles.driverPhone}>{u.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles remain the same
const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #141414, #050505)",
    padding: "32px 40px",
    color: "#fff",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  header: {
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(14px)",
    padding: "28px 32px",
    borderRadius: 20,
    marginBottom: 35,
    boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
  },
  title: { margin: 0, fontSize: 26, fontWeight: 700, color: "#facc15" },
  subtitle: { marginTop: 6, fontSize: 14, opacity: 0.6 },
  grid: { display: "grid", gridTemplateColumns: "1.3fr 1.7fr", gap: 30 },
  card: {
    background: "#ffffff",
    color: "#000",
    borderRadius: 20,
    padding: "24px 26px",
    boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
  },
  sectionTitle: { fontSize: 18, fontWeight: 700, marginBottom: 16 },
  input: { width: "94%", padding: "14px 16px", marginTop: 12, borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 14 },
  button: { marginTop: 18, width: "100%", padding: "15px", background: "linear-gradient(135deg, #facc15, #fbbf24)", border: "none", borderRadius: 14, fontWeight: 700, cursor: "pointer" },
  driverRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f1f5f9" },
  driverInfo: { display: "flex", flexDirection: "column", gap: 4 },
  driverName: { fontWeight: 600 },
  driverPhone: { fontSize: 12, opacity: 0.6 },
  badge: { padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, color: "#fff" },
  booking: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", borderRadius: 14, background: "#f9fafb", marginBottom: 14 },
  bookingTitle: { fontWeight: 600 },
  meta: { fontSize: 12, opacity: 0.6, marginTop: 4 },
  price: { fontWeight: 700, fontSize: 16 },
};

export default Admin;



