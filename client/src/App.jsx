import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignUpPage/SignupPage';
import LoginComponent from './component/LoginComponent/LoginComponent';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/user/tasks" />
              ) : (
                <Navigate to="/user/login" />
              )
            }
          />
          <Route path="/user/tasks" element={<HomePage />} />
          <Route path="/user/signup" element={<SignupPage />} />
          <Route path="/user/login" element={<LoginComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
