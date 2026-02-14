
import carlogo from './carlogo.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Driverlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/driver/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setOutput("❌ " + (data.message || "Login failed"));
        return;
      }

      // ✅ Driver exists → login success
      setOutput("✅ Driver login successful");

      

      // go to driver dashboard
      navigate("/driver");

    } catch (error) {
      console.error(error);
      setOutput("❌ Server not running or network error");
    }
  }

  return (
    <div style={{
      display:'flex',
      justifyContent:"center",
      flexDirection:"column",
      alignItems:"center",
      marginTop:"8%"
    }}>
      <img src={carlogo} alt="GoCab" style={{ height:"150px", width:"350px" }} />

      <div style={{
        height:"400px",
        width:"400px",
        border:"1px solid black",
        borderRadius:"5px",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        paddingTop:'30px'
      }}>

        <h1 style={{ fontFamily: "Poppins, sans-serif" }}>DRIVER LOGIN</h1>

        <form
          onSubmit={handleLogin}
          style={{ width:"80%", display:"flex", flexDirection:"column", gap:"15px", marginTop:"20px" }}
        >
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              style={{ height:"30px", width:"300px", borderRadius:"5px" }}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              style={{ height:"30px", width:"300px", borderRadius:"5px" }}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop:"20px",
              height:"30px",
              width:"300px",
              borderRadius:"5px",
              background:"#9999FF",
              fontSize:"17px"
            }}
          >
            Login
          </button>
        </form>

        {output && (
          <p style={{
            marginTop:"15px",
            fontWeight:"bold",
            color: output.startsWith("❌") ? "red" : "green"
          }}>
            {output}
          </p>
        )}
      </div>
    </div>
  );
}

export default Driverlogin;     