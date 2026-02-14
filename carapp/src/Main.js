import carlogo from './carlogo.png';
import map from './map.png';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Main({ user }) {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  // 🔹 Convert address → lat/lng (OpenStreetMap)
  const getCoords = async (place) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
    );
    const data = await res.json();

    if (!data || data.length === 0) {
      throw new Error(`Location not found: ${place}`);
    }

    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  };

  const handleBooking = async () => {
    try {
      if (!pickup || !drop) {
        alert("Please enter pickup and drop location");
        return;
      }

      // ✅ Get real coordinates
      const pickupCoords = await getCoords(pickup);
      const dropCoords = await getCoords(drop);

      navigate("/booking", {
        state: {
          pickup,
          drop,
          pickupCoords,
          dropCoords
        }
      });

    } catch (err) {
      alert(err.message || "Unable to find location");
    }
  };

  return (
    <div>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'center',gap: "60px", padding: "10px 20px", alignItems: 'center'}}>
        <img src={carlogo} alt="GoCab" style={{height:"120px",width:"250px", marginRight: "60px" }}/>
        <h1 style={{ fontSize:'30px', fontWeight:'485' }}>
          <Link to="/home" style={{ cursor:"pointer", textDecoration: 'none', color: 'inherit'}}>Home</Link>
        </h1>
        <h1 style={{ fontSize:'30px', fontWeight:'485' }}>
          <Link to="/about" style={{ cursor:"pointer", textDecoration: 'none', color: 'inherit' }}>About Us</Link>
        </h1>
        <h1 style={{ fontSize:'30px', fontWeight:'485' }}>Safety</h1>
        <h1 style={{ fontSize:'30px', fontWeight:'485' }}>Blog</h1>
        <h1 style={{ fontSize:'30px', fontWeight:'485' }}>Contact Us</h1>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center', padding: "10px 20px" ,alignItems: 'center'}} >
          <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg" style={{height:"55px"}} alt="profile"/>
          <h1 style={{ fontSize:'30px', fontWeight:'485',marginLeft:"5px" }}>
            {user ? ` ${user.name}` : <Link to="/login" style={{ cursor:"pointer", textDecoration: 'none', color: 'inherit' }}>Login</Link>}
          </h1>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${map})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '650px',
          width: '100%',
          boxShadow: 'inset 0 0 0 1000px rgba(255, 255, 255, 0.1)',
          display:'flex',
          alignItems:'center',
          flexDirection:'column',
          rowGap:"10px",
          paddingTop:"70px"
        }}
      >
        <h1 style={{fontSize:"60px",fontFamily: "'Georgia', serif",fontWeight: 500,letterSpacing: "1.5px"}}>
          Elevating Everyday Travel !!
        </h1>

        <input
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          style={{
            height:"79px",
            width:"600px",
            borderRadius:"8px",
            border:"1px solid grey",
            fontSize:"20px",
            paddingLeft: "40px"
          }}
          type="text"
          placeholder='Enter Pickup Location'
        />

        <input
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          style={{
            height:"79px",
            width:"600px",
            borderRadius:"8px",
            border:"1px solid grey",
            fontSize:"20px",
            paddingLeft: "40px"
          }}
          type="text"
          placeholder='Enter Drop Location'
        />

        {/* UI SAME – ONLY LOGIC UPDATED */}
        <button
          style={{
            height:"79px",
            width:"640px",
            borderRadius:"8px",
            border:"1px solid grey",
            background:"#FFD700",
            fontSize:"22px"
          }}
          onClick={handleBooking}
        >
          <b>BOOK RIDE</b>
        </button>
      </div>

      <footer style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <p>© 2026 GoCab Transportation. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Main;

