import React, { useEffect, useState } from "react";
import { Colors } from "src/lib";
import { FigureType } from "src/types";
import { YEAR_WIDTH } from "src/utils/figures";

const FIGURE_TILE_HEIGHT = 26;

const generateColor = () => Colors[Math.floor(Math.random() * Colors.length)];

const FigureTile = ({
  figure,
  leftOffsetYears,
  expand,
  row,
}: {
  figure: FigureType;
  leftOffsetYears: number;
  expand: any;
  row: number;
}): JSX.Element => {
  const { birth, death, name, color } = figure;

  figure.color = color || generateColor();

  const lifespan = death - birth;

  const top = row * FIGURE_TILE_HEIGHT;
  const left = leftOffsetYears * YEAR_WIDTH + 5;
  const width = lifespan * YEAR_WIDTH - 5;

  return (
    <div
      title={name}
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        backgroundColor: color,
        padding: "3px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={expand}
    >
      {name}
    </div>
  );
};

export default FigureTile;
