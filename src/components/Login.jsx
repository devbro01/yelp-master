import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import log_pic from "../assets/login-bgi.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongMsg, setWrongMsg] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => setWrongMsg(false))
      .catch(() => setWrongMsg(true));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${log_pic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="col-md-6">
        <div
          className="card mt-5 p-3"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
        >
          <div className="card-body">
            <h2 className="text-center font-weight-bold mb-4">
              Log in <i className="fa-solid fa-arrow-right-to-bracket" />
            </h2>
            <p className="text-center mb-4">Please log in to continue work.</p>
            <form onSubmit={loginHandler}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address <i className="fa-regular fa-envelope" />
                </label>
                <input
                  placeholder="example@yahoo.com"
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password <i className="fa-solid fa-lock" />
                </label>
                <input
                  placeholder="x x x x x x x x"
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
              {wrongMsg && (
                <p className="text-danger mb-3">
                  Your email or password is Wrong
                  <i className="fa-solid fa-circle-exclamation" />
                </p>
              )}
              <p className="mb-3">
                Don't have an account?{" "}
                <Link to={"/register"}>Register Here</Link>
              </p>
              <button type="submit" className="btn btn-primary btn-block">
                Log in <i className="fa-solid fa-arrow-right-to-bracket" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
