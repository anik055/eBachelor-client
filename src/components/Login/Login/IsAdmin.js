import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

function IsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  // const loggedInUser = '';
  const { loggedInUser } = useAuth();

  const formData = new FormData();
  formData.append("email", loggedInUser.email);

  useEffect(() => {
    fetch("http://localhost:5050/isAdmin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsAdmin(data);
      });
  }, []);
  return isAdmin;
}

export default IsAdmin;
