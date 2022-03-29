import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "../Dashboard/mainDash.css";
const AddAdmin = () => {
  const [info, setInfo] = useState({});
  const handleBlur = (e) => {
    const newInfo = { ...info };
    newInfo[e.target.name] = e.target.value;
    console.log(newInfo);
    setInfo(newInfo);
  };

  const handleSubmit = (event) => {
    // const formData = new FormData();
    // formData.append("email", info.email);
    // console.log(info);
    const formData = new FormData();
    formData.append("email", info.email);
    console.log(info);

    fetch("http://localhost:5050/addAdmin", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("admin added successfully");
      })
      .catch((error) => {
        console.error(error);
      });

    event.preventDefault();
    document.getElementById("input").value = "";
    // document.getElementsByTagName('input').value = '';
    console.log(document.getElementById("input").value);
  };
  return (
    <section className="">
      <div className="main-dash">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="exampleInputEmail1">Add Admin</label>
            <input
              onChange={handleBlur}
              type="text"
              id="input"
              className="form-control"
              name="email"
              placeholder="Enter email"
            />
            <button type="submit" className="btn btn-primary my-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddAdmin;
