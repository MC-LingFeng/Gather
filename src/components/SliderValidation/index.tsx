import { useCssModule } from '@/hooks';
import { Button, message } from 'antd';
import { useCallback, useEffect, useRef } from 'react';
import styles from './index.module.css';
import Sliget from './svg/Slider';

interface CanvasCard {
  sliderL: number;
  sliderR: number;
  PI: number;
  loading: string;
  failedText: string;
}
const SliderValidation = () => {
  const styleCtx = useCssModule(styles);
  const sliderRef = useRef<HTMLDivElement>(null);
  const canvasCard = useRef<CanvasCard>({
    sliderL: 40,
    sliderR: 9,
    PI: Math.PI,
    loading: 'loading...',
    failedText: 'failed, try again',
  });
  const sliderX = useRef<number>(0);
  const pictureLeft = useRef<number>(0);

  const move = useCallback((e: MouseEvent) => {
    const div = document.getElementById('slider') as HTMLInputElement;
    const picture = document.getElementById(
      'picture-slider',
    ) as HTMLInputElement;

    if (
      picture &&
      div &&
      e.clientX - sliderX.current >= 0 &&
      e.clientX - sliderX.current <= 340
    ) {
      div.style.left = e.clientX - sliderX.current + 'px';
      picture.style.left = e.clientX - sliderX.current + 'px';
    }
  }, []);

  let drawImg = function (ctx, operation, x, y) {
    const isIE = window.navigator.userAgent.indexOf('Trident') > -1;
    const that = canvasCard.current;
    let l = that.sliderL;
    let r = that.sliderR;
    let PI = that.PI;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
    ctx.lineTo(x + l, y);
    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
    ctx.lineTo(x + l, y + l);
    ctx.lineTo(x, y + l);
    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.stroke();
    ctx[operation]();
    ctx.globalCompositeOperation = isIE ? 'xor' : 'overlay';
  };

  const initCavas = (x, y) => {
    const canvas = document.getElementById(
      'picture-slider-canvas',
    ) as HTMLCanvasElement;
    const block = canvas.cloneNode(true) as HTMLCanvasElement; // 滑块
    const canvasCtx = canvas.getContext('2d');
    const blockCtx = block.getContext('2d');
    const that = canvasCard.current;
    const L = that.sliderL + that.sliderR * 2 + 3;

    const img = new Image();
    img.width = 400;
    img.height = 180;
    img.crossOrigin = 'Anonymous';
    img.src =
      'https://fastly.picsum.photos/id/1075/400/180.jpg?hmac=vArTvf0OXBA8X1v9xfC-23-OMx4NvPMY_ZiYYQhqL0E';
    const loadCount = 0;
    img.onload = () => {
      const randomY = Math.floor(Math.random() * (130 - 10 + 1) + 10);
      const randomX = Math.floor(Math.random() * (300 - 100 + 1) + 100);

      drawImg(canvasCtx, 'fill', randomX, randomY);
      drawImg(blockCtx, 'clip', randomX, randomY);
      const imgData = blockCtx?.getImageData(
        randomX - 3,
        randomY,
        L,
        L,
      ) as ImageData;
      block.width = L;
      blockCtx?.putImageData(imgData, 0, randomY);
      canvasCtx?.drawImage(img, 0, 0, 400, 180);
    };
    // canvasCtx
  };

  useEffect(() => {
    const randomY = Math.floor(Math.random() * (130 - 10 + 1) + 10);
    const randomX = Math.floor(Math.random() * (300 - 100 + 1) + 100);
    initCavas(randomX, randomY);
    const slider = document.getElementById('slider') as HTMLInputElement;
    const picture = document.getElementById(
      'picture-slider',
    ) as HTMLInputElement;
    const pictureBorder = document.getElementById(
      'picture-slider-border',
    ) as HTMLInputElement;
    if (picture) {
      picture.style.top = randomY + 'px';
    }
    if (pictureBorder) {
      pictureBorder.style.top = randomY + 'px';
      pictureBorder.style.left = randomX + 'px';
    }
    if (slider) {
      slider.addEventListener('mousedown', (e) => {
        sliderX.current = e.clientX;
        document.addEventListener('mousemove', move);
      });
      document.addEventListener('mouseup', () => {
        const left = Number(picture?.style?.left?.split('px')?.[0] ?? 0);
        const leftBorder = Number(
          pictureBorder?.style?.left?.split('px')?.[0] ?? 0,
        );
        pictureLeft.current = left;

        document.removeEventListener('mousemove', move);
        if (left + 2 >= leftBorder && leftBorder + 2 >= left) {
          message.success('1');
        }
        picture.style.left = '0px';
        slider.style.left = '0px';
        sliderX.current = 0;
        slider.removeEventListener('mousedown', () => {});
        slider.removeEventListener('mouseup', () => {});
      });
    }
    return () => {
      slider.removeEventListener('mousedown', () => {});
      slider.removeEventListener('mouseup', () => {});
    };
  }, []);

  return (
    <div className={styleCtx('slider-validation-container')}>
      <canvas
        className={styleCtx('slider-validation-picture')}
        id="picture-slider-canvas"
      ></canvas>
      {/* <div className={styleCtx('slider-validation-picture')}>
        <div style={{ width: 40, height: 40, position: 'absolute', border: '1px solid red'}} id='picture-slider-border'>

        </div>
        <div style={{ width: 40, height: 40, position: 'absolute', backgroundColor: '#000' }} ref={cardRef} id='picture-slider'>

        </div>
      </div> */}
      <div
        className={styleCtx('slider-validation-slider')}
        key="slider-container-key"
        id="slider-container"
      >
        <div
          key="slider-div"
          id="slider"
          style={{ width: 40, height: 40, position: 'absolute', left: 0 }}
          ref={sliderRef}
        >
          <Sliget />
        </div>
      </div>
      <Button
        onClick={() => {
          window.location.pathname = '/table';
        }}
      >
        123
      </Button>
    </div>
  );
};

export default SliderValidation;
