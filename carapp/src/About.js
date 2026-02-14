import carlogo from './carlogo.png';
import { Link } from "react-router-dom";
function About({user}){
    return(
        <div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',gap: "60px", padding: "10px 20px", alignItems: 'center'}}>
             <img src={carlogo} alt="GoCab" style={{height:"120px",width:"250px", marginRight: "60px" }}/>
             <h1 style={{ fontSize:'30px', fontWeight:'485' }} ><Link to="/home" style={{ cursor:"pointer",  textDecoration: 'none',
      color: 'inherit' }}>Home
      </Link></h1>
             <h1 style={{ fontSize:'30px', fontWeight:'485' }}><Link to="/about" style={{ cursor:"pointer",  textDecoration: 'none',
      color: 'inherit', borderBottom: "3px solid black",paddingBottom: "6px" }}>About Us</Link></h1>
             <h1 style={{ fontSize:'30px', fontWeight:'485' }}><Link to="/safety" style={{ cursor:"pointer",  textDecoration: 'none',
      color: 'inherit' }}>Safety</Link></h1>
             <h1 style={{ fontSize:'30px', fontWeight:'485' }}><Link to="/blog" style={{ cursor:"pointer",  textDecoration: 'none',
                   color: 'inherit' }}>Blog</Link></h1>
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
        <div style={{marginLeft:"40px"}} >
            <h1 style={{ fontSize: "50px", fontWeight: 650, lineHeight: "1.2" }}>
    <span>OUR SERVICES</span><br /></h1>
       <img src=" https://rapido-app-assets-staging.storage.googleapis.com/c9bf4e04eeb9f9e5a52c55a143d095c5_1738146120477.webp" style={{marginRight:"30px",marginBottom:"30px"}}></img>
       <img src="https://rapido-app-assets-staging.storage.googleapis.com/baa331808b70d22c33bdcb6e96c3a104_1738146204279.webp"style={{marginRight:"30px",marginBottom:"30px"}}></img>
        <img src="https://rapido-app-assets-staging.storage.googleapis.com/1075eff8297f3213f71cf66b5852ced5_1738146244087.webp"style={{marginRight:"30px",marginBottom:"30px"}}></img>
        <img src="https://rapido-app-assets-staging.storage.googleapis.com/5e0eec287db4aae2e64b17b9fa04cbe0_1738146281373.webp"style={{marginRight:"30px",marginBottom:"30px"}}></img>
        <img src="https://rapido-app-assets-staging.storage.googleapis.com/dd03f189ce375502079087fa3688f981_1738146314270.webp"style={{marginRight:"30px",marginBottom:"30px"}}></img>
        <img src="https://rapido-app-assets-staging.storage.googleapis.com/ed7c8d4653fee97d2cd5c76f00871d72_1738146343883.webp"style={{marginRight:"30px",marginBottom:"30px"}}></img> 
        </div>
        </div>
    );
    }
    export default About;