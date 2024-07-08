import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/config";
import SignUp from "./SignUp"; 
import './login.css'; 

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      setLoggedIn(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {!showSignUp ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <h3 className="login">Login</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>

          <p className="forgot-password text-center">
            New user?{" "}
            <button
              type="button"
              className="signup-link"
              onClick={() => setShowSignUp(true)}
            >
              Sign Up Here
            </button>
          </p>
        </form>
      ) : (
        <SignUp setLoggedIn={setLoggedIn} setShowSignUp={setShowSignUp} />
      )}
    </div>
  );
}

export default Login;
