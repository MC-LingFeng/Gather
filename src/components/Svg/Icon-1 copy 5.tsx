import React from "react";

const Icon = ({ size = "29", fill = "#43484D", ...other }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 29 29" {...other}>
      <g fill="none" fillRule="evenodd">
        <g fill={fill}>
          <g>
            <path d="M27 26c0 .551-.449 1-1 1h-4V15h4c.551 0 1 .449 1 1v10ZM2 27h18V2H2v25Zm24-14h-4V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v25a2 2 0 0 0 2 2h24c1.654 0 3-1.346 3-3V16c0-1.654-1.346-3-3-3ZM5 7h11V5H5v2Zm0 6h8v-2H5v2Zm0 6h12v-2H5v2Z" />
          </g>
        </g>
      </g>
    </svg>
  );
};
export default React.memo(Icon);
