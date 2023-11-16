import React, { useState } from "react";
import FormError from "../layout/FormError";
import ErrorList from "../layout/ErrorList";
import translateServerErrors from "../../services/translateServerErrors";
import config from "../../config";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({});

  const [serverErrors, setServerErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp.emailRegexp;
    let newErrors = {};

    if (email.trim() == "") {
      newErrors = {
        ...newErrors,
        email: "is required",
      };
    }

    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    return false;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
        if (Object.keys(errors).length === 0) {
          const response = await fetch("/api/v1/users", {
            method: "post",
            body: JSON.stringify(userPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          });
          if (!response.ok) {
            if (response.status === 422) {
              const body = await response.json();
              const newServerErrors = translateServerErrors(body.errors);
              return setServerErrors(newServerErrors);
            }
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
          }
          const userData = await response.json();
          setShouldRedirect(true);
        }
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
    <div className="form-background bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign Up</h1>
          <form>
            <div className="mb-4">
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded"
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
                className="block border border-grey-light w-full p-3 rounded"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
                placeholder="Password"
              />
              <FormError error={errors.password} />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded"
                name="passwordConfirmation"
                value={userPayload.passwordConfirmation}
                onChange={onInputChange}
                placeholder="Confirm Password"
              />
              <FormError error={errors.passwordConfirmation} />
            </div>
            <button onClick={onSubmit} type="submit" className="submit-button">
              Register
            </button>
          </form>
        </div>
        <div className="under-form-text">
          Already have an account?{" "}
          <a className="under-form-link" href="../user-sessions/new">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
