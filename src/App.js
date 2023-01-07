import React from "react";
import "./App.css";

const defaultFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function App() {
  const [success, setSuccess] = React.useState(null);
  const [error, setError] = React.useState(null);

  const [user, setUser] = React.useState(defaultFormState);
  let { name, email, password, confirmPassword } = user;

  const handleChange = React.useCallback((e) => {
    let id = e.target.id;
    setUser((prevState) => ({ ...prevState, [id]: e.target.value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(null);
    name = name.trim();
    email = email.trim();

    if (name.length == 0) {
      return setError("Error: Full Name is empty");
    }

    if (email.length == 0) {
      return setError("Error: Email is empty");
    } else {
      if (!email.includes("@")) {
        return setError("Error: Email must contain @");
      } else if (!email.includes(".")) {
        return setError("Error: Email must contain .");
      } else if (emailRegex.test(email) == false) {
        return setError("Error: Invalid Email");
      }
    }

    if (password.length == 0) {
      return setError("Error: Password is empty");
    } else if (confirmPassword.length == 0) {
      return setError("Error: Confirm Password is empty");
    } else if (password != confirmPassword) {
      return setError("Error: Password and Confirm Password do not match");
    }

    // every input is checked and it is now valid
    setError(null);
    setSuccess("Sucessfully Signed Up!");
    // reset input form
    setUser(defaultFormState);
  };

  return (
    <div>
      <h2>Signup</h2>
      <form id="form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <input
          type="text"
          id="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
        />

        <input
          type="password"
          value={confirmPassword}
          id="confirmPassword"
          onChange={handleChange}
          placeholder="Confirm Password"
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default App;
