import React, { useEffect, useState } from "react";

import "./App.css";

import { Figures } from "./lib";
import { getSearchParameters } from "./utils/urlParams";

import Chart from "./components/Chart";
import FigureModal from "./components/FigureModal";

const App = (): JSX.Element => {
  return (
    <div className="App" style={{ top: "0px", left: "0px" }}>
      <Chart filters={getSearchParameters()} />
    </div>
  );
};

export default App;
