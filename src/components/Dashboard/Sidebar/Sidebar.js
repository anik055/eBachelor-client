import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faCalendar,
  faHome,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";

const Sidebar = ({ isAdmin }) => {
  return (
    <div className="sidebar">
      <ul className="sidee">
        <li>
          <Link to="/">
            <FontAwesomeIcon className="color" icon={faHome} />{" "}
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-white">
            <FontAwesomeIcon className="color" icon={faCalendar} />{" "}
            <span>dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="orders" className="text-white">
            <FontAwesomeIcon className="color" icon={faFileAlt} />{" "}
            <span>Orders</span>
          </Link>
        </li>
        {isAdmin && (
          <div>
            <li>
              <Link to="addAdmin" className="text-white">
                <FontAwesomeIcon className="color" icon={faUserPlus} />{" "}
                <span>Add Admin</span>
              </Link>
            </li>
            <li>
              <Link to="addProduct" className="text-white">
                <FontAwesomeIcon className="color" icon={faFileAlt} />{" "}
                <span>Add Product</span>
              </Link>
            </li>
            <li>
              <Link to="manage" className="text-white">
                <FontAwesomeIcon className="color" icon={faCog} />{" "}
                <span>Manage Product</span>
              </Link>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
