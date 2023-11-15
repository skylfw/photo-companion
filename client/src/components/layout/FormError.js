import React from "react";

const FormError = ({ error = "" }) => {
  if (error !== "") {
    return <div className="ml-1 text-red-400">{error}</div>;
  }
  return null;
};

export default FormError;
