import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import reg_pic from "../assets/register-bgi.jpg";

const Register = ({ itemCollectionAccount }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const confirmPass = () => {
    return confirmPassword === password;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const confirm = confirmPass();
    if (confirm) {
      createUserWithEmailAndPassword(getAuth(), email, password).catch(() =>
        setErrorMsg(true)
      );
      addDoc(itemCollectionAccount, {
        userName,
        email,
      });
    } else {
      setShowConfirmMessage(true);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${reg_pic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="col-md-6 w-50">
        <div
          className="card mt-5 p-3"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
        >
          <div className="card-body">
            <h2 className="text-center font-weight-bold mb-4">
              Sign up <i className="fa-solid fa-user-plus" />
            </h2>
            <p className="text-center mb-4">Sign up to countionue work</p>
            <form onSubmit={submitForm}>
              <div className="mb-3">
                <label htmlFor="user" className="form-label">
                  User Name <i className="fa-solid fa-user"></i>
                </label>
                <input
                  type="text"
                  name="user"
                  className="form-control"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password <i className="fa-solid fa-lock"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address <i className="fa-solid fa-envelope"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password <i className="fa-solid fa-check"></i>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                />
                {showConfirmMessage && (
                  <p className="text-danger">
                    Please confirm your password
                    <i className="fa-solid fa-circle-exclamation" />
                  </p>
                )}
              </div>
              {errorMsg && (
                <>
                  <p className="text-danger">
                    Maybe your Email or Password already taken pls change
                  </p>
                  <i className="fa-solid fa-circle-exclamation" />
                </>
              )}
              <p>
                You have an accounts yet? <Link to={"/login"}>Login</Link>
              </p>
              <button type="submit" className="btn btn-primary btn-block">
                Sign up <i className="fa-solid fa-bolt" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
