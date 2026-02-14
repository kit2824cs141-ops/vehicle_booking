import { useEffect, useState } from "react";

function Driver() {
  const [rides, setRides] = useState([]);
  const driverId = localStorage.getItem("driverId");

  useEffect(() => {
    fetch(`http://localhost:5000/driver/${driverId}/rides`)
      .then(res => res.json())
      .then(data => setRides(data));
  }, [driverId]);

  return (
    <div style={{ padding: 30 }}>
      <h2>🚗 My Assigned Rides</h2>

      {rides.length === 0 && <p>No rides assigned</p>}

      {rides.map(r => (
        <div key={r._id} style={{
          border: "1px solid #ccc",
          padding: 15,
          marginBottom: 10,
          borderRadius: 6
        }}>
          <p><b>Pickup:</b> {r.pickup}</p>
          <p><b>Drop:</b> {r.drop}</p>
          <p><b>Vehicle:</b> {r.vehicle}</p>
          <p><b>Distance:</b> {r.distanceKm} km</p>
          <p><b>Price:</b> ₹{r.price}</p>
          <p><b>Status:</b> {r.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Driver;
