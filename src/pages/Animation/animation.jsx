import React, { useState, useEffect } from 'react';

import './animation.css';

const Animation = () => {
    const restitution = 1.0;
    const rotationSpeed = 5;
    const fieldWidth = 950;
    const fieldHeight = 450;
    const ballSize = 150;
    const maxX = fieldWidth - ballSize;
    const maxY = fieldHeight - ballSize;
    let vX = 9;
    let vY = 9;

    const [running, setRunning] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [goDown, setGoDown] = useState(true);
    const [goRight, setGoRight] = useState(true);
    const [rotation, setRotation] = useState(0);
    const [ballType, setBallType] = useState('none');

    const checkKeyboard = (e) => {
      if (e.key === '1') {
        changeBall('basketball');
      } else if (e.key === '2') {
        changeBall('football');
      } else if (e.key === '3') {
        changeBall('volleyball');
      } else if (e.key === '4') {
        changeBall('human');
      } else if (e.key === '5') {
        changeBall('cartoon');
      } else if (e.key === '6') {
        changeBall('logo');
      } else if (e.key === '0') {
        changeBall('none');
      } else if (e.key === ' ') {
        runClick();
      }
    };

    useEffect(() => {
      const process = () => {
        if (running) {
          calculate();
          render();
        }
      };

      const interval = setInterval(process, 40);
      document.addEventListener('keydown', checkKeyboard);

      return () => {
        clearInterval(interval);
        document.removeEventListener('keydown', checkKeyboard);
      };
    }, [running, x, y, goDown, goRight, ballType, rotation]);

    const calculate = () => {
      if (goRight) {
        setX((prevX) => {
          const newX = prevX + vX;
          if (newX >= maxX) {
            setGoRight(false);
            vX = vX * restitution;
            return maxX;
          }
          return newX;
        });
      } else {
        setX((prevX) => {
          const newX = prevX - vX;
          if (newX <= 0) {
            setGoRight(true);
            vX = vX * restitution;
            return 0;
          }
          return newX;
        });
      }

      if (goDown) {
        setY((prevY) => {
          const newY = prevY + vY;
          if (newY >= maxY) {
            setGoDown(false);
            vY = vY * restitution;
            return maxY;
          }
          return newY;
        });
      } else {
        setY((prevY) => {
          const newY = prevY - vY;
          if (newY <= 0) {
            setGoDown(true);
            vY = vY * restitution;
            return 0;
          }
          return newY;
        });
      }
    };

    const render = () => {
      setRotation((prevRotation) => (prevRotation + rotationSpeed) % 360);
    };

    const runClick = () => {
      setRunning(!running);
    };

    const changeBall = (type) => {
        setBallType(type); // อัปเดตประเภทของลูกบอล

        let imgUrl;

        switch (type) {
            case 'basketball':
                imgUrl = './Img/Basketball.png';
                break;
            case 'football':
                imgUrl = './Img/Football.jpeg';
                break;
            case 'volleyball':
                imgUrl = './Img/Volletball.png';
                break;
            case 'human':
                imgUrl = './Img/Human.jpg';
                break;
            case 'cartoon':
                imgUrl = './Img/Cartoon.jpeg';
                break;
            case 'logo':
                imgUrl = './Img/Logo.png';
                break;
            case 'none':
                imgUrl = 'none';
                break;
            default:
                return;
        }

        // เปลี่ยนภาพตามประเภทลูกบอล
        const ballElement = document.getElementById('ball');
        ballElement.style.backgroundImage = type === 'none' ? 'none' : `url('${imgUrl}')`; // ตั้งค่าภาพใหม่
    };

    return (
        <div id="container">
            <div id="field">
                <div
                    id="ball"
                    style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: `rotate(${rotation}deg)`,
                        backgroundImage: ballType !== 'none' ? `url('./Img/${ballType}.png')` : 'none',
                    }}
                ></div>
            </div>
            <div id="control" className='control-container'>
                <h1 style={{backgroundColor: 'red', padding: '10px',color: 'white'}}>ต้องกดDouble Click!!!</h1>
                <button onClick={() => changeBall('none')  } className='btn btn-outline-primary'  style={{ marginRight: '10px' }}>None</button>
                <button onClick={() => changeBall('basketball')} className='btn btn-outline-primary'style={{ marginRight: '10px' }} >Basketball</button>
                <button onClick={() => changeBall('football')} className='btn btn-outline-primary' style={{ marginRight: '10px' }}>Football</button>
                <button onClick={() => changeBall('volleyball')} className='btn btn-outline-primary' style={{ marginRight: '10px' }}>Volleyball</button>
                <button onClick={() => changeBall('human')} className='btn btn-outline-primary' style={{ marginRight: '10px' }}>Human</button>
                <button onClick={() => changeBall('cartoon')} className='btn btn-outline-primary' style={{ marginRight: '10px' }}>Cartoon</button>
                <button onClick={() => changeBall('logo')} className='btn btn-outline-primary' style={{ marginRight: '10px' }}>Logo</button>
            </div>
        </div>
    );
};


export default Animation;