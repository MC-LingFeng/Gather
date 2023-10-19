import React from "react";

const Icon = ({ width = "26", height = "34", fill = "#43484D", ...other }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 26 34" {...other}>
      <g fill="none" fillRule="evenodd">
        <g fill={fill}>
          <g>
            <path d="M24 31c0 .551-.449 1-1 1H7V2h4v11.001l5-3.718 5 3.718V2h2c.551 0 1 .449 1 1v28ZM3 32c-.551 0-1-.449-1-1V3c0-.551.449-1 1-1h2v30H3ZM13 2h6v7.021l-3-2.23-3 2.23V2Zm10-2H3C1.346 0 0 1.346 0 3v28c0 1.654 1.346 3 3 3h20c1.654 0 3-1.346 3-3V3c0-1.654-1.346-3-3-3Z" />
          </g>
        </g>
      </g>
    </svg>
  );
};
export default React.memo(Icon);
