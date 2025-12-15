import { useEffect, useState } from "react";
import "./App.css";
import CustomerRow from "./components/CustomerRow";
import NewCustomer from "./components/NewCustomer";

function App() {
  const [customers, setCustomers] = useState([]);
  const [newCustomers, setNewCustomers] = useState([]);
  const [newCustomerMaxID, setnewCustomerMaxID] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/customers")
      .then((response) => response.json())
      .then((data) => {
        for (const element of data) {
          element["viewMode"] = true;
        }
        setCustomers(data);
      });
  }, []);

  function deleteCustomer(value) {
    fetch(`http://127.0.0.1:8080/customers/${value.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      setCustomers((oldValues) => {
        return oldValues.filter((customer) => customer !== value);
      });
    });
  }

  function editModeChange(id) {
    console.log("Changing edit mode");
    for (const element of customers) {
      if (element.id == id) {
        element["viewMode"] = !element["viewMode"];
      }
    }
    setCustomers((prevCustomers) => [...prevCustomers]);
  }

  function updateCustomer(id, name, email, phone, address) {
    console.log("Updating customer:", { id, name, email, phone, address });
    let customerForUpdate = { name: name, email: email, phone: phone, address: address };
    fetch(`http://127.0.0.1:8080/customers/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerForUpdate),
    }).then(() => {
      for (const element of customers) {
        if (element.id == id) {
          element.name = name;
          element.email = email;
          element.phone = phone;
          element.address = address;
          editModeChange(id);
          break;
        }
      }
    });
  }

  function addNewCustomerInput() {
    setNewCustomers((newCustomers) => [...newCustomers, newCustomerMaxID]);
    setnewCustomerMaxID(() => newCustomerMaxID + 1);
  }

  function deleteNewCustomer(id) {
    setNewCustomers((oldValues) => {
      return oldValues.filter((customer) => customer !== id);
    });
  }

  function updateNewCustomer(newCustomer) {
    setCustomers([...customers, newCustomer]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Simple CRM</p>
      </header>
      <div>
        {customers.map((customer) => (
          <div key={customer.id}>
            <CustomerRow
              customer={customer}
              deleteCustomer={deleteCustomer}
              editModeChange={editModeChange}
              updateCustomer={updateCustomer}
            />
          </div>
        ))}
      </div>
      {newCustomers.map((newCustomerID) => (
        <div key={newCustomerID}>
          <NewCustomer
            id={newCustomerID}
            deleteCustomer={deleteNewCustomer}
            updateNewCustomer={updateNewCustomer}
          ></NewCustomer>
        </div>
      ))}
      <div>
        <button onClick={() => addNewCustomerInput()}>New Customer</button>
      </div>
    </div>
  );
}

export default App;
