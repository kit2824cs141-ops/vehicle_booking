import { Link } from "react-router-dom";
import carlogo from './carlogo.png';
function Safety({ user }) {
  return (
     <div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',gap: "60px", padding: "10px 20px", alignItems: 'center'}}>
                 <img src={carlogo} alt="GoCab" style={{height:"120px",width:"250px", marginRight: "60px" }}/>
                 <h1 style={{ fontSize:'30px', fontWeight:'485' }} ><Link to="/home" style={{ cursor:"pointer",  textDecoration: 'none',
          color: 'inherit'}}>Home
          </Link></h1>
                 <h1 style={{ fontSize:'30px', fontWeight:'485' }}><Link to="/about" style={{ cursor:"pointer",  textDecoration: 'none',
          color: 'inherit' }}>About Us</Link></h1>
                 <h1 style={{ fontSize:'30px', fontWeight:'485' }}><Link to="/safety" style={{ cursor:"pointer",  textDecoration: 'none',
      color: 'inherit', borderBottom: "3px solid black",paddingBottom: "6px" }}>Safety
      </Link></h1>
                 <h1 style={{ fontSize:'30px', fontWeight:'485' }}><Link to="/blog" style={{ cursor:"pointer",  textDecoration: 'none',
                       color: 'inherit' }}>Blog</Link></h1>
                 <h1 style={{ fontSize:'30px', fontWeight:'485' }}><Link to="/contact" style={{ cursor:"pointer",  textDecoration: 'none',
          color: 'inherit' }}>Contact Us
          </Link></h1>
                 <div style={{display:'flex',flexDirection:'row',justifyContent:'center', padding: "10px 20px" ,alignItems: 'center'}} >
                <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg" style={{height:"55px"}}/>
                <h1 style={{ fontSize:'30px', fontWeight:'485',marginLeft:"5px" }}>
                                {user ? ` ${user.name}` : <Link to="/login" style={{ cursor:"pointer", textDecoration: 'none', color: 'inherit' }}>Login</Link>}
                </h1>
            </div>
            </div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"flex start",gap:"50px",paddingLeft:"100px"}}>
        <div style={{ textAlign: "center", maxWidth: "700px" }}>
     <div style={{marginTop:"100px"}}>
  <h1 style={{ fontSize: "60px", fontWeight: 700, lineHeight: "1.2" }}>
    <span>Safety for All</span><br />
    
  </h1>

  <p style={{ fontSize: "30px", marginTop: "20px", lineHeight: "1.5" }}>
    <span>At GoCab, the well-being of our customers is above </span><br />
    <span> everything else. We are constantly in  </span><br />
    <span> pursuit of enhancing our safety measures to ensure </span>
     <span> every GoCab ride is a pleasant and comfortable experience.</span>
  </p>
  </div>
</div>
<img src="https://rapido-app-assets-staging.storage.googleapis.com/fc70552b297693e48cef580e9f9c50c3_1738574004491.webp"style={{ marginTop: "60px",height:"500px",width:"900px"}}></img>
</div>
            </div>
  )
}

export default Safety;
