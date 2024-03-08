import opentype from 'opentype.js';
import React, { useEffect } from 'react';
import Kai from './Kaiti.ttf';
/** 笔顺动画原数据 */

const createShape = (
  font: opentype.Font,
  content: string,
  svg: SVGSVGElement,
) => {
  let pathMarkup = '';
  const fontPaths = font.getPaths(content, 0, 1024 - 128, 1024);
  fontPaths.forEach((fontPath) => {
    let path = fontPath.toSVG(2);
    pathMarkup += path;
  });
  console.log(fontPaths);

  const g = svg.childNodes[1] as SVGSVGElement;
  g.insertAdjacentHTML('beforeend', pathMarkup);
  // g.setAttribute('transform', 'scale(0.5, 0.5)');
  let viewBox = svg.getBBox();
  // console.log([0, 0, (viewBox.width + viewBox.x).toFixed(2), (viewBox.height + viewBox.y).toFixed(2)], viewBox);

  g.setAttribute(
    'viewBox',
    [
      0,
      0,
      (viewBox.width + viewBox.x).toFixed(2),
      (viewBox.height + viewBox.y).toFixed(2),
    ].join(' '),
  );
};

const Font = () => {
  const ref = React.useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    opentype.load(Kai, (err, font) => {
      if (ref.current && font) {
        createShape(font, '我', ref.current);
      } else {
        console.log(err);
      }
    });
  }, [ref.current]);

  return (
    <div>
      <svg
        version="1.1"
        viewBox="0 0 1024 1024"
        ref={ref}
        id="my-font"
        name="my-font"
      >
        {/* 田字格绘制 */}
        <g
          key="wordBg"
          stroke="var(--primary)"
          strokeDasharray="1,1"
          strokeWidth="1"
          transform="scale(4, 4)"
        >
          <line x1="0" y1="0" x2="256" y2="0"></line>
          <line x1="0" y1="0" x2="0" y2="256"></line>
          <line x1="256" y1="0" x2="256" y2="256"></line>
          <line x1="0" y1="256" x2="256" y2="256"></line>
          <line x1="0" y1="0" x2="256" y2="256"></line>
          <line x1="256" y1="0" x2="0" y2="256"></line>
          <line x1="128" y1="0" x2="128" y2="256"></line>
          <line x1="0" y1="128" x2="256" y2="128"></line>
        </g>
        {/* 文字svg路径 */}
        <g id="my-font-g"></g>
      </svg>
    </div>
  );
};

export default Font;
