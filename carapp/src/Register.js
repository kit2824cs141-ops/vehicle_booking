import carlogo from './carlogo.png';
import { Link,useNavigate} from "react-router-dom";
import { useState } from "react";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();


  async function handleRegister(e) {
  e.preventDefault();

  if (password !== confirmPassword) {
    setMsg("❌ Passwords do not match");
    return;
  }

  const res = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  setMsg(data.message);

  // ✅ FIXED STRING
  if (data.message === "✅ Registration successful") {
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }
}

  return (
    <div style={{display:'flex',justifyContent:"center",flexDirection: "column" ,alignItems: "center",marginTop:"8%"}}>
    <img src={carlogo} alt="GoCab" style={{height:"150px",width:"350px"}}/>
    <div style={{height:"450px",  width:"400px",border:"1px solid black",borderRadius:"5px",display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'flex-start',  paddingTop:'30px' }}>
    <h1 style={{ fontFamily: "Poppins, sans-serif" }}>Register</h1>

  <form onSubmit={handleRegister} style={{width: "80%",display: "flex", flexDirection: "column",gap: "15px",marginTop: "20px",}}>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>Email</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} required style={{height:"30px",width:"300px",borderRadius:"5px"}}/>
    </div>

    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{height:"30px",width:"300px",borderRadius:"5px"}}/>
    </div>
    
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>Confirm Password</label>
      <input type="password"  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required  style={{height:"30px",width:"300px",borderRadius:"5px"}}/>
    </div>

    <button type="submit"style={{ marginTop: "20px",height:"30px",width:"300px",borderRadius:"5px",background:"#9999FF",fontSize:"17px"}}>Sign Up</button>
  </form>
     {msg && <p>{msg}</p>}
    </div>
    </div>


  );
}

export default Register;
