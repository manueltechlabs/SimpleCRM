import React from "react";
import { useState } from "react";
import "../App.css";

export default function NewCustomer(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    let newCustomer = { name: name, email: email, phone: phone, address: address};

    fetch("http://127.0.0.1:8080/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);        
        props.updateNewCustomer({
          id: data.id,
          name: name,
          email: email,
          phone: phone,
          address: address,
          createdAt: data.createdAt,
          viewMode: true,          
        });
        props.deleteCustomer(props.id);
      })
      .catch(() => {
        console.log("Somthing failed");
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="NewCustomer">
        <div className="InputBox">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="InputBox">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="InputBox">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className="InputBox">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
        <button onClick={() => props.deleteCustomer(props.id)}>Delete</button>
      </div>
    </form>
  );
}
