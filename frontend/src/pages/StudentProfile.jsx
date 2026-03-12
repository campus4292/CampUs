import React from "react";

function StudentProfile() {

const user = JSON.parse(localStorage.getItem("user"));

return (

<div style={{padding:"20px"}}>

<h2 style={{marginBottom:"20px"}}>My Profile</h2>

<div style={profileCard}>

<div style={profileHeader}>

<div style={avatar}>
{user?.username?.charAt(0).toUpperCase()}
</div>

<div>

<h3>{user?.username}</h3>
<p>{user?.email}</p>

</div>

</div>

<hr style={{margin:"15px 0"}}/>

<div style={profileInfo}>

<p><b>Role:</b> {user?.role}</p>
<p><b>Coins:</b> {user?.coins}</p>
<p><b>Account ID:</b> {user?.id}</p>

</div>

</div>

</div>

)

}

export default StudentProfile;

const profileCard = {
background:"#ffffff",
padding:"20px",
borderRadius:"12px",
boxShadow:"0 6px 18px rgba(0,0,0,0.08)",
maxWidth:"500px"
}

const profileHeader = {
display:"flex",
alignItems:"center",
gap:"15px"
}

const avatar = {
width:"60px",
height:"60px",
borderRadius:"50%",
background:"#2563eb",
color:"white",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"22px",
fontWeight:"bold"
}

const profileInfo = {
lineHeight:"28px",
fontSize:"14px"
}