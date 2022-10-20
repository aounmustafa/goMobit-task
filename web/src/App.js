import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddUser from "./components/AddUser";
import Layout from "./components/Layout";
import ViewUsers from "./components/ViewUsers";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<AddUser />} />
          <Route path="viewUsers" element={<ViewUsers />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
