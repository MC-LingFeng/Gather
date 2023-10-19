import React from "react";

const Icon = ({ width = "34", height = "33", fill = "#43484D", ...other }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 34 33" {...other}>
      <g fill="none" fillRule="evenodd">
        <g fill={fill}>
          <g>
            <path d="M29 18v8l-15.167-6H11v9.06C11 31.269 9.278 33 7.082 33 4.812 33 3 31.233 3 29.06V20h-.834C1.062 20 0 19.105 0 18V8c0-1.105 1.062-2 2.167-2h11.692L29 0v8h.135c2.682 0 4.864 2.243 4.864 5s-2.182 5-4.864 5H29Zm0-2v-6h.135c1.61 0 2.919 1.346 2.919 3s-1.31 3-2.92 3H29ZM20 5.651l6.987-2.768v20.236L14 17.98V8.03l4-1.585v6.852h2V5.652ZM5 20h4v9.06c0 1.105-.841 1.97-1.959 1.97-1.106 0-2.04-.903-2.04-1.97V20Zm-3-2h10V8H2v10Z" />
          </g>
        </g>
      </g>
    </svg>
  );
};
export default React.memo(Icon);
