import React, { useState } from "react";
import { Figures } from "src/lib";

import { FigureType } from "src/types";
import { CURRENT_YEAR, filterBy, RowTracker } from "src/utils/figures";
import FigureModal from "./FigureModal";

import FigureTile from "./FigureTile";
import Ruler from "./Ruler";

const Chart = ({ filters }): JSX.Element => {
  const [expandedFigure, setExpandedFigure] = useState(null);

  const filteredFigures = filterBy(Figures, filters);

  if (filteredFigures.length === 0) {
    return <div style={{ textAlign: "center" }}>No results were found</div>;
  }

  const max = filters["max"] || filteredFigures[0].death || CURRENT_YEAR;
  const min =
    filters["min"] || filteredFigures[filteredFigures.length - 1].birth;

  const rowTracker = new RowTracker();

  return (
    <>
      <div id="ruler" style={{ position: "absolute", height: "20px" }}>
        <Ruler max={max} min={min} />
      </div>
      <div
        id="chart"
        style={{ position: "absolute", top: "22px", left: "0px" }}
      >
        {filteredFigures.map((figure: FigureType) => {
          figure.death ||= CURRENT_YEAR;
          const deathOffsetFromCurrentYear = max - figure.death;

          return (
            <FigureTile
              key={figure.wiki}
              figure={figure}
              row={rowTracker.assignToRow(figure)}
              leftOffsetYears={deathOffsetFromCurrentYear}
              expand={() => setExpandedFigure(figure)}
            />
          );
        })}
      </div>
      {expandedFigure && (
        <FigureModal
          figure={expandedFigure}
          closeModal={() => setExpandedFigure(null)}
        />
      )}
    </>
  );
};

export default Chart;
