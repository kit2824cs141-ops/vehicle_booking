import carlogo from './carlogo.png';
import { Link, useNavigate } from "react-router-dom";

function Home({ user }) {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'center',gap: "60px", padding: "10px 20px", alignItems: 'center'}}>
        <img src={carlogo} alt="GoCab" style={{height:"120px",width:"250px", marginRight: "60px" }}/>
        
        <h1 style={{ fontSize:'30px', fontWeight:'485' }}>
          <Link to="/home" style={{ cursor:"pointer", textDecoration: 'none', color: 'inherit', borderBottom: "3px solid black",paddingBottom: "6px" }}>
            Home
          </Link>
        </h1>
        <h1 style={{ fontSize:'30px', fontWeight:'485' }}>
          <Link to="/about" style={{ cursor:"pointer", textDecoration: 'none', color: 'inherit' }}>About Us</Link>
        </h1>
        <h1 style={{ fontSize:'30px', fontWeight:'485' }}>
          <Link to="/safety" style={{ cursor:"pointer", textDecoration: 'none', color: 'inherit' }}>Safety</Link>
        </h1>
        <h1 style={{ fontSize:'30px', fontWeight:'485' }}>
          <Link to="/blog" style={{ cursor:"pointer", textDecoration: 'none', color: 'inherit' }}>Blog</Link>
        </h1>
        <h1 style={{ fontSize:'30px', fontWeight:'485' }}>
          <Link to="/contact" style={{ cursor:"pointer", textDecoration: 'none', color: 'inherit' }}>Contact Us</Link>
        </h1>

        <div style={{display:'flex',flexDirection:'row',justifyContent:'center', padding: "10px 20px" ,alignItems: 'center'}}>
          <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg" style={{height:"55px"}}/>
          <h1 style={{ fontSize:'30px', fontWeight:'485', marginLeft:"5px" }}>
            {user ? (
              ` ${user.name}`
            ) : (
              <Link to="/login" style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}>
                Login
              </Link>
            )}
          </h1>
        </div>
      </div>

      <div style={{display:"flex",flexDirection:"row",justifyContent:"flex start",gap:"50px",paddingLeft:"100px"}}>
        <div style={{ textAlign: "center", maxWidth: "700px" }}>
          <h1 style={{ fontSize: "60px", fontWeight: 700, lineHeight: "1.2" }}>
            <span>Get Quick Rides,</span><br />
            <span>Low Fares</span>
          </h1>

          <p style={{ fontSize: "30px", marginTop: "20px", lineHeight: "1.5" }}>
            <span>In GoCab we ensure our customers</span><br />
            <span> get rides quickly at the most </span><br />
            <span> affordable prices.</span>
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{height: "80px",width: "200px",borderRadius: "12px",background: "black",color: "white",fontSize: "18px"}}
          >
            BOOK A RIDE ➜
          </button>
        </div>
        <img src="https://rapido-app-assets-staging.storage.googleapis.com/7bfb291ed6fd8fef3949b695f66f0441_1738146457741.webp" style={{ marginTop: "60px",height:"500px",width:"900px"}} />
      </div>
    </div>
  );
}

export default Home;