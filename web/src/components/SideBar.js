import React from "react";
import "./SideBar.css";
import { Routes } from "../Routes";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signIn");
  };
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <ul className="list">
        {Routes.map((item, key) => {
          return (
            <li
              className="Row"
              onClick={
                item.title === "Log out"
                  ? () => logout()
                  : () => {
                      navigate(item.link);
                      console.log(item.link);
                    }
              }
              id={location.pathname === item.link ? "active" : ""}
            >
              <div id="icon"> {item.icon}</div>
              <div id="title"> {item.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SideBar;
