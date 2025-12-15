import React from "react";
import { useState } from "react";
import "../App.css";

export default function CustomerRow(props) {
  const [id, setId] = useState(props.customer.id);
  const [name, setName] = useState(props.customer.name);
  const [email, setEmail] = useState(props.customer.email);
  const [phone, setPhone] = useState(props.customer.phone);
  const [address, setAddress] = useState(props.customer.address);
  const [createdAt, setCreatedAt] = useState(props.customer.createdAt);

  if (props.customer.viewMode) {
    return (
      <div className="Customer">
        <p style={{ margin: 20 }}>{id}</p>
        <p style={{ margin: 20 }}>{name}</p>
        <p style={{ margin: 20 }}>{email}</p>
        <p style={{ margin: 20 }}>{phone}</p>
        <p style={{ margin: 20 }}>{address}</p>
        <p style={{ margin: 20 }}>{createdAt}</p>

        <button onClick={() => props.deleteCustomer(props.customer)}>Delete</button>
        <button onClick={() => props.editModeChange(props.customer.id)}>
          Edit
        </button>
      </div>
    );
  } else {
    return (
      <div className="Customer">
        <div className="NewCustomer">
          <p style={{ margin: 20 }}>{id}</p>
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
        </div>
        <button onClick={() => props.updateCustomer(id, name, email, phone, address)}>
          Update
        </button>
        <button onClick={() => props.editModeChange(props.customer.id)}>
          Restore
        </button>
      </div>
    );
  }
}
