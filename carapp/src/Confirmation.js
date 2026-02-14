import { useLocation, useNavigate } from "react-router-dom";

function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <h2 style={{ padding: 40 }}>No Booking Found</h2>;
  }

  const {
    pickup,
    drop,
    vehicle,
    distance,
    price,
    driver,
    rideDate,
    rideTime
  } = state;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f2f2f2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: 360,
          background: "#fff",
          borderRadius: 20,
          padding: 25,
          boxShadow: "0 15px 40px rgba(0,0,0,0.1)"
        }}
      >
        {/* HEADER */}
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          🎉 Ride Confirmed
        </h2>

        {/* RIDE DETAILS */}
        <div style={{ fontSize: 14 }}>
          <Row label="Pickup" value={pickup} />
          <Row label="Drop" value={drop} />
          <Row label="Vehicle" value={vehicle} />
          <Row label="Distance" value={`${distance} km`} />
          <Row label="Date" value={rideDate} />
          <Row label="Time" value={rideTime} />
        </div>

        {/* DRIVER DETAILS */}
        {driver && (
          <div
            style={{
              background: "#FFF6CC",
              borderRadius: 12,
              padding: 15,
              marginTop: 20
            }}
          >
            <h4 style={{ marginBottom: 10 }}>🚖 Driver Details</h4>
            <Row label="Name" value={driver.name} />
            <Row label="Phone" value={driver.phone} />
          </div>
        )}

        {/* PRICE */}
        <h3 style={{ textAlign: "center", marginTop: 20 }}>
          Total Fare: ₹{price}
        </h3>

        {/* END RIDE */}
        <button
          onClick={() => navigate("/home")}
          style={{
            width: "100%",
            height: 50,
            marginTop: 20,
            borderRadius: 30,
            background: "black",
            color: "#FFD400",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

/* Reusable row */
function Row({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6
      }}
    >
      <span style={{ color: "#555" }}>{label}</span>
      <span style={{ fontWeight: "600" }}>{value || "-"}</span>
    </div>
  );
}

export default Confirmation;


