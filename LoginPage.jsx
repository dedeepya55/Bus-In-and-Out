import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flip, setFlip] = useState(false); // State to handle card flip

  // useNavigate hook to programmatically navigate
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/login', {
        Email: email,  
        password
      });
      console.log(response.data);
      if(response.data.access==1){
        console.log(1);
      }
      else{
        console.log(0);
      }
      alert(response.data.message); // Show alert for login success

      // Redirect to main component route ("/") after successful login=
      navigate('/Home', { state: { access: response.data.access } }); // Adjust this path if needed
    } catch (error) {
      console.error(error); // Log error for debugging
      alert(error.response?.data?.message || 'Error logging in'); // Show alert for login error
    }
  };

  // Function to handle card flip when switching between User Login and Admin Login
  const handleFlip = () => {
    setFlip(!flip);
  };
  const forgotpass = async () => {
    try {
      const response = await axios.post('http://localhost:9000/send-mail', {
        Email: email
      });
      alert('mail sent');
    } catch (error) {
      console.error("Error in forgotpass function:", error);
      alert('Failed to send reset email');
    }
  };

  return (
    <section className="hero-section">
      <div className={`hero-content ${flip ? 'flipped' : ''}`}>
        <div className="card-front">
          <center><h1 className="userlogin">User Login</h1></center>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="forgot-password" style={{ marginBottom: '20px' }}>
              <a href="#" style={{ textDecoration: 'underline', color: 'white' }} onClick={forgotpass}>
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-button">Login</button>
          </form>
          
          <button onClick={handleFlip} className="register-button">
            Admin Login
          </button>
        </div>

        {/* Back side (Admin Login) */}
        <div className="card-back">
          <center><h1>Admin Login</h1></center>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your admin email"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your admin password"
                required
              />
            </div>
            <div className="forgot-password" style={{ marginBottom: '20px' }}>
              <a href="#" style={{ textDecoration: 'underline', color: 'white' }} onClick={forgotpass}>
                Forgot Password?
              </a>
            </div>x`x`
            <button type="submit" className="login-button">Admin Login</button>
          </form>

          <button onClick={handleFlip} className="register-button">
            User Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
