import React from "react";

const Spinner = ({}): JSX.Element => {
  return (
    <img
      src="/TailSpin.svg"
      alt="Loading"
      width="50px"
      height="50px"
      className="animate-spin"
    />
  );
};

Spinner.defaultProps = {
  white: false,
};

export default Spinner;
