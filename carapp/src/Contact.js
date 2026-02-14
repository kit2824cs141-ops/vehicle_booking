import { Link } from "react-router-dom";
import carlogo from './carlogo.png';

function Contact({ user }) {
  return (
    <div style={{ minHeight: "100vh" }}>

    <div style={{display:'flex',flexDirection:'row',justifyContent:'center',gap: "60px", padding: "10px 20px", alignItems: 'center'}}>
                     <img src={carlogo} alt="GoCab" style={{height:"120px",width:"250px", marginRight: "60px" }}/>
                     <h1 style={{ fontSize:'30px', fontWeight:'485' }} ><Link to="/home" style={{ cursor:"pointer",  textDecoration: 'none',
              color: 'inherit'}}>Home
              </Link></h1>
                     <h1 style={{ fontSize:'30px', fontWeight:'485' }}><Link to="/about" style={{ cursor:"pointer",  textDecoration: 'none',
              color: 'inherit' }}>About Us</Link></h1>
                     <h1 style={{ fontSize:'30px', fontWeight:'485' }}><Link to="/safety" style={{ cursor:"pointer",  textDecoration: 'none',
          color: 'inherit'}}>Safety
          </Link></h1>
                     <h1 style={{ fontSize:'30px', fontWeight:'485' }}><Link to="/blog" style={{ cursor:"pointer",  textDecoration: 'none',
          color: 'inherit'}}>Blog
          </Link></h1>
                     <h1 style={{ fontSize:'30px', fontWeight:'485' }}><Link to="/contact" style={{ cursor:"pointer",  textDecoration: 'none',
          color: 'inherit', borderBottom: "3px solid black",paddingBottom: "6px" }}>Contact Us
          </Link></h1>
                     <div style={{display:'flex',flexDirection:'row',justifyContent:'center', padding: "10px 20px" ,alignItems: 'center'}} >
                    <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg" style={{height:"55px"}}/>
                   <h1 style={{ fontSize:'30px', fontWeight:'485',marginLeft:"5px" }}>
                                {user ? ` ${user.name}` : <Link to="/login" style={{ cursor:"pointer", textDecoration: 'none', color: 'inherit' }}>Login</Link>}
                    </h1>
                </div>
                </div>

    
      <div
        style={{
          background: "#FFD400",
          padding: "80px 20px",
          textAlign: "center"
        }}
      >
        <h1 style={{ fontSize: "50px", marginBottom: "10px" }}>
          Contact Us
        </h1>
        <p style={{ fontSize: "20px" }}>
          We’re always here to help you
        </p>
      </div>

     
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "80px 20px"
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            width: "420px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}
        >
          <h2 style={{ marginBottom: "25px" }}>Our Contact Details</h2>

          <p style={{ fontSize: "18px", marginBottom: "20px" }}>
            📍 <b>Address</b><br />
            GoCab Pvt Ltd,<br />
            Chennai, Tamil Nadu
          </p>

          <p style={{ fontSize: "18px", marginBottom: "20px" }}>
            📞 <b>Phone</b><br />
            +91 98765 43210
          </p>

          <p style={{ fontSize: "18px" }}>
            ✉️ <b>Email</b><br />
            support@gocab.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;

