import React, { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = (payload) => {
    setErrors({});
    const { email, password } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
        const response = await fetch("/api/v1/user-sessions", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const userData = await response.json();
        setShouldRedirect(true);
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="form-container">
      <div className="form-item-container">
        <div className="form-card">
          <h1 className="form-title">Sign In</h1>
          <form>
            <div className="mb-4">
              <input
                type="text"
                className="input-field"
                name="email"
                value={userPayload.email}
                onChange={onInputChange}
                placeholder="Email"
              />
              <FormError error={errors.email} />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="input-field"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
                placeholder="Password"
              />
              <FormError error={errors.password} />
            </div>
            <button onClick={onSubmit} type="submit" className="submit-button">
              Sign In
            </button>
          </form>
        </div>
        <div className="under-form-text">
          Don't have an account?{" "}
          <a className="under-form-link" href="../users/new">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
