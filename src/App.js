import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "./App.css";
import Home from './Home';
import Profile from './components/User/Profile';
import Clubs from './Clubs';
import Login from './components/User/Login.components';
import Register from './components/User/Register.components';
import Logout from './components/User/Logout.components';
import Calendar from './Calendar'; 
import DocAI from './DocAI'; 
import ClubCreationForm from './components/ClubCreationForm'; 


function App() {
  return (
    <Router>
      <div className="app-background" style={{ backgroundColor: "#f0f0f5", minHeight: "100vh" }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">RoarBoard</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/Profile">Profile</Link>
              <Link className="nav-item nav-link" to="/Clubs">Clubs</Link>
              <Link className="nav-item nav-link" to="/Calendar">Calendar</Link>
              <Link className="nav-item nav-link" to="/DocAI">Doc the AI</Link>
            </div>
            <div className="ml-auto">
              <Link className="btn btn-outline-light" to="/login">Login</Link>
              <Link className="btn btn-outline-light" to="/logout">Logout</Link>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/docai" element={<DocAI />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/protected" element={<div>Protected content will be here after development.</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
