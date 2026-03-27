import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const Home = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const handleRegistry = (): void => {
    setIsRegistered((prev) => !prev);
  };

  return (
    <section className="home section">
      <h1>Welcome to Task Manager</h1>
      {!isRegistered ? (
        <article>
          <Login />
          <p>Not Registered? click below to Sign Up</p>
        </article>
      ) : (
        <article>
          <Register />
          <p>Registered? click below to Login</p>
        </article>
      )}
      <button onClick={handleRegistry}>
        {isRegistered ? "Login" : "Register"}
      </button>
    </section>
  );
};

export default Home;
