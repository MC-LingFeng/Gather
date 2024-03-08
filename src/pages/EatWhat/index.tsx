import { Button } from 'antd';
import React, { useEffect } from 'react';
import './index.css';
const DefaultMerchant = [
  '老太太拌饭',
  '烤面筋卷饼',
  '功夫一锅',
  '隆江猪脚饭',
  '吉',
  '啃得',
  '麦当儿',
  'begerKin',
  '喝粥',
  '烤鸭',
  '金手勺',
];
// const DefaultMerchantGame = ['gta5', 'lol','暖雪', '老头法环', '呆着', '看剧', '哈', '看门狗','我的world', '饥荒', '铲铲']

const TURNS = 3;
let selectIndex = 0;
let intervalIndex = 0;

const EatWhat = () => {
  let inter: NodeJS.Timeout | null = null;
  let timeout: NodeJS.Timeout | null = null;

  const [loading, setLoading] = React.useState(false);
  const interval = ({
    times,
    intervalTime,
    foodDoms,
  }: {
    times: number;
    intervalTime: number;
    foodDoms: NodeListOf<Element>;
  }) => {
    inter = setInterval(() => {
      if (
        times * 1000 - intervalIndex * intervalTime <= 2000 &&
        inter !== null
      ) {
        const intervalTimeKey = intervalTime + 300;
        clearInterval(inter);
        interval({ times, intervalTime: intervalTimeKey, foodDoms });
      }
      if (selectIndex !== 0) {
        foodDoms.item(selectIndex - 1).className = 'food-item';
      } else {
        foodDoms.item(foodDoms.length - 1).className = 'food-item';
      }

      foodDoms.item(selectIndex).className += ' food-item-select';
      if (selectIndex === foodDoms.length - 1) {
        selectIndex = 0;
      } else {
        selectIndex++;
      }
      intervalIndex++;
    }, intervalTime);
  };

  const onClick = () => {
    setLoading(true);
    selectIndex = 0;
    intervalIndex = 0;
    const foodDoms = document.querySelectorAll('.food-item');
    const times = Math.floor(Math.random() * foodDoms.length) + 1;
    let intervalTime = (times * 1000) / (TURNS + 1) / foodDoms.length;
    foodDoms.forEach((item) => {
      item.className = 'food-item';
    });

    interval({
      times,
      intervalTime,
      foodDoms,
    });

    timeout = setTimeout(() => {
      if (inter) {
        clearInterval(inter);
        setLoading(false);
        foodDoms.forEach((item) => {
          if (item.className.indexOf('food-item-select') !== -1) {
            console.log(item.innerHTML);
            alert(`今天就吃${item.innerHTML}把！`);
          }
        });
      }
    }, times * 1000);
  };

  useEffect(() => {
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, []);
  return (
    <div>
      <ul>
        {DefaultMerchant.map((item, index) => {
          return (
            <li
              data-id={index + 1}
              key={`${index}--${item}`}
              className="food-item"
            >
              {item}
            </li>
          );
        })}
      </ul>
      <Button onClick={onClick} loading={loading}>
        {loading ? '正在选择' : '开始'}
      </Button>
    </div>
  );
};

export default EatWhat;
