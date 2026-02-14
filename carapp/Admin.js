import { useEffect, useState } from "react";

function Admin() {
  const [drivers, setDrivers] = useState([]);
  const [rides, setRides] = useState([]);
  const [users, setUsers] = useState([]);

  const [driverForm, setDriverForm] = useState({
    name: "",
    phone: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const d = await fetch("http://localhost:5000/drivers").then(r => r.json());
    const r = await fetch("http://localhost:5000/rides").then(r => r.json());
    const u = await fetch("http://localhost:5000/users").then(r => r.json());

    setDrivers(d);
    setRides(r);
    setUsers(u);
  };

  const addDriver = async () => {
    await fetch("http://localhost:5000/add-driver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driverForm)
    });

    setDriverForm({ name: "", phone: "" });
    fetchData();
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>🛠 Admin Dashboard</h2>

      {/* ADD DRIVER */}
      <section>
        <h3>Add Driver</h3>
        <input
          placeholder="Name"
          value={driverForm.name}
          onChange={e => setDriverForm({ ...driverForm, name: e.target.value })}
        />
        <input
          placeholder="Phone"
          value={driverForm.phone}
          onChange={e => setDriverForm({ ...driverForm, phone: e.target.value })}
        />
        <button onClick={addDriver}>Add</button>
      </section>

      {/* DRIVERS */}
      <section>
        <h3>🚖 Drivers</h3>
        {drivers.map(d => (
          <p key={d._id}>
            {d.name} – {d.phone} – <b>{d.status}</b>
          </p>
        ))}
      </section>

      {/* RIDES */}
      <section>
        <h3>📦 Bookings</h3>
        {rides.map(r => (
          <div key={r._id} style={{ marginBottom: 10 }}>
            <b>{r.pickup}</b> → {r.drop} | ₹{r.price} | {r.status}
            <br />
            Driver: {r.driverId?.name || "N/A"}
          </div>
        ))}
      </section>

      {/* USERS */}
      <section>
        <h3>👤 Customers</h3>
        {users.map(u => (
          <p key={u._id}>{u.email}</p>
        ))}
      </section>
    </div>
  );
}

export default Admin;
