import {
  useState,
  type FormEvent,
} from "react";

import { useAuth } from "../context/authContext.tsx";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    setError("");
    setLoading(true);

    try {

      await login({
        email,
        password,
      });

      navigate("/dashboard");

    } catch (error) {

      setError(
        "Invalid email or password"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div>
      <h1>WorkSphere</h1>

      <h2>Sign in</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />
        </div>

        {error && (
          <p>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

      </form>
      <div className="auth-footer">
        <span>Don't have an account?</span>

        <Link to="/register">
          Create account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;