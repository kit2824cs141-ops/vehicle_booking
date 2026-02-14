import carlogo from './carlogo.png';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const err = await res.json();
        setOutput(err.message || "❌ Invalid credentials");
        return;
      }

      const data = await res.json();
      setOutput(data.message || "✅ Login successful");

      // ✅ Save user globally
      setUser({ name: email.split("@")[0], email });

   if (data.user.role === "admin") {
  navigate("/admin");  // 👈 admin page route
} else {
  navigate("/home");
}
    } catch (error) {
      console.error("Login error:", error);
      setOutput("❌ Server not running or network error");
    }
  }

  return (
    <div style={{display:'flex',justifyContent:"center",flexDirection: "column" ,alignItems: "center",marginTop:"8%"}}>
      <img src={carlogo} alt="GoCab" style={{height:"150px",width:"350px"}}/>
      <div style={{height:"400px",  width:"400px",border:"1px solid black",borderRadius:"5px",display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'flex-start',  paddingTop:'30px' }}>
        <h1 style={{ fontFamily: "Poppins, sans-serif" }}>LOGIN</h1>

        <form onSubmit={handleLogin} style={{width: "80%",display: "flex", flexDirection: "column",gap: "15px",marginTop: "20px"}}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Email</label>
            <input
              type="text"
              value={email}
              style={{height:"30px",width:"300px",borderRadius:"5px"}}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              style={{height:"30px",width:"300px",borderRadius:"5px"}}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" style={{ marginTop: "20px",height:"30px",width:"300px",borderRadius:"5px",background:"#9999FF",fontSize:"17px"}}>
            Login
          </button>
        </form>

        {output && (
          <p style={{ marginTop: "15px", fontWeight: "bold" }}>{output}</p>
        )}

        <p style={{ marginTop: "20px" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{color:"blue", cursor:"pointer"}}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
