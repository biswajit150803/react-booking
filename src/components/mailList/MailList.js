import React from "react";
import "./MailList.css";
function MailList() {
  return (
    <div className="mail">
      <h1 className="mailListTitle"><b>Save Time,Save Money!</b></h1>
      <span className="mailDesc">
        Subscribe to our newsletter and we'll send the best deals to you
      </span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email"></input>
        <button>Subscribe</button>
      </div>
    </div>
  );
}

export default MailList;
