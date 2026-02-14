import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MapView from "./MapView";

function Booking({ user }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  // ---------- STATES ----------
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [vehicle, setVehicle] = useState("Bike");
  const [price, setPrice] = useState(null);

  // ✅ NEW STATES
  const [rideDate, setRideDate] = useState("");
  const [rideTime, setRideTime] = useState("");

  const pickup = state?.pickup || "";
  const drop = state?.drop || "";

  // ---------- GET COORDINATES ----------
  const getCoords = async (place) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
    );
    const data = await res.json();
    if (!data.length) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };
  };

  // ---------- DISTANCE ----------
  const calculateDistance = (a, b) => {
    const R = 6371;
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLon = (b.lng - a.lng) * Math.PI / 180;

    const x =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(a.lat * Math.PI / 180) *
        Math.cos(b.lat * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return (R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))).toFixed(2);
  };

  // ---------- LOAD COORDS ----------
  useEffect(() => {
    if (!pickup || !drop) return;

    async function load() {
      const p = await getCoords(pickup);
      const d = await getCoords(drop);

      if (p && d) {
        setPickupCoords(p);
        setDropCoords(d);
        setDistance(calculateDistance(p, d));
      }
    }

    load();
  }, [pickup, drop]);

  // ---------- PRICE ----------
  useEffect(() => {
    if (!distance) return;

    const rates = {
      Bike: 6,
      Auto: 10,
      Car: 15
    };

    setPrice(Math.round(distance * rates[vehicle]));
  }, [distance, vehicle]);

  // ---------- CONFIRM RIDE ----------
  const confirmRide = async () => {
    if (!pickupCoords || !dropCoords || !rideDate || !rideTime) {
      alert("Please select date & time");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/book-ride", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickup,
          drop,
          pickupCoords: [pickupCoords.lat, pickupCoords.lng],
          dropCoords: [dropCoords.lat, dropCoords.lng],
          vehicle,
          rideDate,
          rideTime
        })
      });

      const data = await res.json();

      if (data.success) {
        navigate("/confirmation", {
          state: {
            pickup,
            drop,
            vehicle,
            distance,
            price,
            driver: data.driver,
            rideDate,
            rideTime,
            bookingId: data.bookingId
          }
        });
      } else {
        alert(data.message||"Booking failed");
      }
    } catch {
      alert("Backend not running");
    }
  };

  if (!pickup || !drop) {
    return <h2 style={{ padding: 40 }}>No booking data found</h2>;
  }

  return (
    <div>
      <div style={{ height: "350px" }}>
        {pickupCoords && dropCoords && (
          <MapView pickup={pickupCoords} drop={dropCoords} />
        )}
      </div>

      <div style={{ padding: 15 }}>
        <p><b>Pickup:</b> {pickup}</p>
        <p><b>Drop:</b> {drop}</p>
        <p><b>Distance:</b> {distance ? `${distance} km` : "-- km"}</p>
      </div>

      <div style={{ padding: 15 }}>
        {["Bike", "Auto", "Car"].map((v) => (
          <div
            key={v}
            onClick={() => setVehicle(v)}
            style={{
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
              border: vehicle === v ? "2px solid black" : "1px solid #ccc",
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer"
            }}
          >
            <span>{v}</span>
            {vehicle === v && price && <b>₹ {price}</b>}
          </div>
        ))}
      </div>

      {/* ✅ DATE & TIME */}
      <div style={{ padding: 15 }}>
        <label>Date</label>
        <input
          type="date"
          value={rideDate}
          onChange={(e) => setRideDate(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <label>Time</label>
        <input
          type="time"
          value={rideTime}
          onChange={(e) => setRideTime(e.target.value)}
          style={{ width: "100%", padding: 10 }}
        />
      </div>

      <div style={{ padding: 15 }}>
        <button
          onClick={confirmRide}
          style={{
            width: "100%",
            height: 55,
            background: "#FFD400",
            border: "none",
            borderRadius: 30,
            fontWeight: "bold"
          }}
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
}

export default Booking;
