import React, { useState } from "react";
import "../Dashboard/mainDash.css";

const AddProduct = () => {
  const [info, setInfo] = useState({});
  const [file, setFile] = useState(null);
  const handleBlur = (e) => {
    const newInfo = { ...info };
    newInfo[e.target.name] = e.target.value;
    console.log(newInfo);
    setInfo(newInfo);
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
    console.log(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", info.name);
    formData.append("description", info.description);
    formData.append("price", info.price);
    formData.append("category", info.category);

    fetch("https://ebachelor.herokuapp.com/addProduct", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("product added successfully");
        for (let i = 0; i < 5; i++) {
          document.getElementsByClassName("form-control")[i].value = "";
        }
      })
      .catch((error) => {
        console.error(error);
      });
    e.preventDefault();
  };

  return (
    <section>
      <div className="main-dash">
        <h5 className="text-brand">Add a product</h5>
        <form onSubmit={handleSubmit}>
          <div style={{ width: "100%" }} className="form-group ">
            <label for="category">Choose a category: </label>
            <select
              id="category"
              name="category"
              value={info.category}
              onChange={handleBlur}
            >
              <option className="form-control" value="all">
                All
              </option>
              <option value="grocery">Grocery</option>
              <option value="food">Food</option>
              <option value="medical">Medical</option>
              <option value="electronics">Electronics</option>
            </select>
            <label style={{ display: "block" }} htmlFor="exampleInputEmail1">
              Product Name
            </label>
            <input
              onBlur={handleBlur}
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter package name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Description</label>
            <input
              onBlur={handleBlur}
              type="text"
              className="form-control"
              name="description"
              placeholder="Add description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Price</label>
            <input
              onBlur={handleBlur}
              type="text"
              className="form-control"
              name="price"
              placeholder="Enter price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Upload a image</label>
            <input
              onChange={handleFileChange}
              type="file"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Picture"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
