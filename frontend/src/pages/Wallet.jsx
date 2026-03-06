import React from "react";

function Wallet() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Campus Wallet</h1>
      <p>Coins Balance: <b>{user?.coins || 100}</b></p>
    </div>
  );
}

export default Wallet;