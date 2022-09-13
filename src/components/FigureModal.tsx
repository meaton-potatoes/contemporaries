import React, { useState, useEffect } from "react";
import wiki from "wikipedia";

import { FigureType } from "src/types";

import Spinner from "./Spinner";

const WIKI_BASE_URL = "https://en.wikipedia.org/wiki";

const FigureModal = ({
  figure,
  closeModal,
}: {
  figure: FigureType;
  closeModal: any;
}): JSX.Element => {
  const [summary, setSummary] = useState(null);

  const { name } = figure;

  useEffect(() => {
    if (figure) {
      setSummary(null);
      wiki
        .page(figure.wiki)
        .then((page) => page.summary())
        .then(setSummary);
    } else {
      setSummary(null);
    }
  }, [figure]);

  console.log(summary);

  return (
    <div
      id="modal"
      style={{
        position: "fixed",
        top: "0px",
        right: "0px",
        zIndex: "100",
        backgroundColor: "white",
        width: "300px",
        bottom: "0px",
        boxShadow: "2px 2px 8px gray",
        overflow: "scroll",
        padding: "0 10px",
      }}
    >
      <button
        onClick={closeModal}
        style={{ position: "absolute", top: "2px", right: "2px" }}
      >
        X
      </button>
      <div style={{ top: "15px" }}>
        <h1>{name}</h1>
        {summary ? (
          <>
            <div>
              {summary.originalimage && (
                <div style={{ textAlign: "center", margin: "8px" }}>
                  <img
                    src={summary.originalimage.source}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      border: "10px inset goldenrod",
                    }}
                  />
                </div>
              )}

              <div style={{ fontWeight: "bold", margin: "8px" }}>
                {summary.description}
              </div>
              <div style={{ margin: "8px" }}>{summary.extract}</div>
              <a href={`${WIKI_BASE_URL}/${figure.wiki}`} target="_blank">
                Open Wikipedia
              </a>
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default FigureModal;
