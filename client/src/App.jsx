import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignUpPage/SignupPage';
import LoginComponent from './componet/LoginComponent/LoginComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <>
          <Route path="/user/tasks" element={<HomePage/>} />
            <Route path="/user/signup" element={<SignupPage />} />
            <Route path="/user/login" element={<LoginComponent />} />
          </>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
