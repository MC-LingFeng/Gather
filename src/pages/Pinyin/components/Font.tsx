import opentype from 'opentype.js';
import React, { useEffect, useMemo } from 'react';
import Kai from './Kaiti.ttf';
import { TextItemType } from '..';
import { WordType } from '../type';
import { Segmented } from 'antd';
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

  const g = svg.childNodes[1] as SVGSVGElement;
  g.insertAdjacentHTML('beforeend', pathMarkup);
  let viewBox = svg.getBBox();

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

const Font = ({font: textItem, res: { data, loading }, onChange} 
  : {font?: TextItemType, res: { data: WordType, loading: boolean }, onChange: (value: string) => void}) => {
  const ref = React.useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    opentype.load(Kai, (err, font) => {
      if (ref.current && font) {
        createShape(font, textItem?.text??'', ref.current);
      } else {
        console.log(err);
      }
    });
  }, [ref.current, textItem, data]);

  return (
    <div>
      <div>{data?.pinyin ?? ''}</div>
      <Segmented 
        value={textItem?.pinyin as any}
        options={textItem?.polyphony?.map((item) => ({ label: item, value: item }))??[]}
        onChange={onChange as any}
      />
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
      <div>
        <div>解释</div>
        <p style={{ whiteSpace: 'pre-wrap' }}>{data?.explanation ?? ''}</p>
      </div>
      {/* <div>
        <div>更多</div>
        <p style={{ whiteSpace: 'pre-wrap'}}>{data?.more ?? ''}</p>
      </div> */}
    </div>
  );
};

export default Font;
