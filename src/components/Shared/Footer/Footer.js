import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

const Footer = () => {
  const tags = [
    "wedding",
    "photography",
    "portrait",
    "birthday",
    "cinematography",
    "live concert",
  ];
  return (
    <div className="bg-dark text-white">
      <div
        style={{ margin: "0px auto", padding: "10px" }}
        className="row w-75 "
      >
        <div className="col-md-4 my-2">
          <h3 className="text-primary">PHOTODIARY</h3>
          <h6 className="p-2 m-2">
            <FontAwesomeIcon
              className="icon mx-2 bg-dark"
              icon={faMapMarkerAlt}
            />
            Head Office: House-40, Flat-A2, 1st Floor, Road-5, Block-G, Banani,
            Dhaka- 1213, Bangladesh.{" "}
          </h6>
          <h6 className="p-2 m-2">
            <FontAwesomeIcon className="icon mx-2" icon={faPhone} />
            Phone: +8801752525252, +880174444444
          </h6>
          <h6 className="p-2 m-2">
            <FontAwesomeIcon className="icon mx-2" icon={faEnvelope} />
            Email: anikzaman67@gmail.com
          </h6>
        </div>

        <div className="col-md-4 my-2">
          <h3>Tags</h3>
          <div className="row">
            {tags.map((tag) => (
              <div className="column m-2 border p-2">{tag}</div>
            ))}
          </div>
        </div>

        <div className="col-md-4 my-2">
          <h3>Follow us on social media</h3>
          <ul className="social-media list-inline">
            <li className="list-inline-item">
              <a href="//facebook.com">
                <FontAwesomeIcon
                  className="icon active-icon"
                  icon={faFacebookF}
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="//google.com">
                <FontAwesomeIcon className="icon" icon={faGooglePlusG} />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="//instagram.com">
                <FontAwesomeIcon className="icon" icon={faInstagram} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
