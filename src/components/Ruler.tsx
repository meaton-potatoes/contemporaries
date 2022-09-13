import React from "react";
import { YEAR_WIDTH } from "src/utils/figures";

const Ruler = ({ max, min }: { max: number; min: number }): JSX.Element => {
  return (
    <div id="ruler" style={{ display: "flex" }}>
      {[...Array(max - min)].map((_x, i) => {
        const year = max - i;
        const showTick = year % 10 === 0;
        return (
          <div
            key={year}
            onMouseEnter={() => console.log(year)}
            style={{
              display: "inline-block",
              width: `${YEAR_WIDTH}px`,
              // maxWidth: `${YEAR_WIDTH}px`,
              borderLeft: showTick ? "1px #000 solid" : "",
              fontSize: "10px",
            }}
          >
            {showTick && year}
          </div>
        );
      })}
    </div>
  );
};

export default Ruler;
