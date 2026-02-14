import { Link } from "react-router-dom";
import carlogo from './carlogo.png';

function Blog({ user }) {
  return (
    <div style={{  minHeight: "100vh" }}>

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
      color: 'inherit', borderBottom: "3px solid black",paddingBottom: "6px" }}>Blog
      </Link></h1>
                 <h1 style={{ fontSize:'30px', fontWeight:'485' }}><Link to="/contact" style={{ cursor:"pointer",  textDecoration: 'none',
                           color: 'inherit'}}>Contact Us
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
          GoCab Blog
        </h1>
        <p style={{ fontSize: "20px" }}>
          Stories, updates & safety insights
        </p>
      </div>

    
      <div
        style={{
          padding: "60px 100px",
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        
        <div
          style={{
            width: "320px",
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
            alt="safety"
            style={{
              width: "100%",
              height: "200px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              objectFit: "cover"
            }}
          />

          <div style={{ padding: "20px" }}>
            <h3>How GoCab Ensures Rider Safety</h3>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              From live tracking to trained captains, safety is our top priority.
            </p>
            
          </div>
        </div>

    
        <div
          style={{
            width: "320px",
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
            alt="captains"
            style={{
              width: "100%",
              height: "200px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              objectFit: "cover"
            }}
          />

          <div style={{ padding: "20px" }}>
            <h3>Meet Our Captains</h3>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              The heroes behind every safe and affordable ride.
            </p>
           
          </div>
        </div>

    
        <div
          style={{
            width: "320px",
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1542362567-b07e54358753"
            alt="rides"
            style={{
              width: "100%",
              height: "200px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              objectFit: "cover"
            }}
          />

          <div style={{ padding: "20px" }}>
            <h3>Affordable Rides Everyday</h3>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              How GoCab keeps pricing low for everyone.
            </p>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
