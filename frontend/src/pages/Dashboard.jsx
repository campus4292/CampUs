import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(){

const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));

return(

<div>

{/* HEADER */}

<div style={headerRow}>

<h2 style={title}>Dashboard</h2>

<div style={userInfo}>
<span>Welcome: <b>{user?.username}</b></span>
<span style={coins}>Coins: {user?.coins}</span>
</div>

</div>


{/* DASHBOARD GRID */}

<div style={grid}>

<div style={cardButton} onClick={()=>navigate("/student/exchange")}>
🔁
<p>Exchange</p>
</div>

<div style={cardButton} onClick={()=>navigate("/student/myrequests")}>
📦
<p>My Requests</p>
</div>

<div style={cardButton} onClick={()=>navigate("/student/academic")}>
📚
<p>Academic</p>
</div>

<div style={cardButton} onClick={()=>navigate("/student/emergency")}>
🚨
<p>Emergency</p>
</div>

<div style={cardButton} onClick={()=>navigate("/student/wallet")}>
💰
<p>Wallet</p>
</div>

<div style={cardButton} onClick={()=>navigate("/student/profile")}>
👤
<p>My Profile</p>
</div>

</div>

</div>

)

}

export default Dashboard


/* ================= STYLES ================= */

const headerRow={
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"20px"
}

const title={
fontSize:"28px",
fontWeight:"700"
}

const userInfo={
display:"flex",
gap:"20px",
fontSize:"16px",
alignItems:"center"
}

const coins={
color:"#2563eb",
fontWeight:"600"
}

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",
gap:"20px"
}

const cardButton={
background:"white",
padding:"30px",
borderRadius:"12px",
boxShadow:"0 5px 15px rgba(0,0,0,0.1)",
textAlign:"center",
cursor:"pointer",
fontSize:"22px",
fontWeight:"600",
transition:"0.2s"
}