import React, { useState } from 'react'

import "./calculator.css";

function Calculator() {
    

    const [currentNumber, setCurrentNumber] = useState('');
    const [previousNumber, setPreviousNumber] = useState('');
    const [operator, setOperator] = useState('');

    const appendNumber = (number) => {
        setCurrentNumber(currentNumber + number);
    };

    const clearAll = () => {
        if (currentNumber !== '') {
            setCurrentNumber(''); // Clear current number
        } else if (previousNumber !== '') {
            setPreviousNumber(''); // Clear previous number
            setOperator(''); // Clear operator
        }
    };

    const calculate = () => {
        const prev = parseFloat(previousNumber);
        const current = parseFloat(currentNumber);

        if (isNaN(prev) || isNaN(current)) return;

        let result;
        if (operator === '+') result = prev + current;
        else if (operator === '-') result = prev - current;
        else if (operator === '*') result = prev * current;
        else if (operator === '/') {
            if (current === 0) {
                alert('Cannot divide by 0');
                return;
            }
            result = prev / current;
        }

        setCurrentNumber(result);
        setPreviousNumber('');
        setOperator('');
    };

    const chooseOperator = (op) => {
        if (currentNumber === '') return;
        if (previousNumber !== '') {
            calculate();
        }
        setOperator(op);
        setPreviousNumber(currentNumber);
        setCurrentNumber('');
    };

    return (
        <span className='calculator_container'>
        <div className="calculator">
            <div>
                <input type="number" className="input_number" value={currentNumber || previousNumber} disabled />
            </div>
            <div>
                <button className='btn_c'>MC</button>
                <button className='btn_c'>MR</button>
                <button className='btn_c'>M+</button>
                <button className='btn_c'>M-</button>
                <button className="button_Ce" onClick={clearAll}>C</button>
            </div>
            <div>
                <button className="btn_number" onClick={() => appendNumber('7')}>7</button>
                <button className="btn_number" onClick={() => appendNumber('8')}>8</button>
                <button className="btn_number" onClick={() => appendNumber('9')}>9</button>
                <button className='btn_c'  onClick={() => chooseOperator('/')}>÷</button>
                <button className='btn_c'>√</button>
            </div>
            <div>
                <button className="btn_number" onClick={() => appendNumber('4')}>4</button>
                <button className="btn_number" onClick={() => appendNumber('5')}>5</button>
                <button className="btn_number" onClick={() => appendNumber('6')}>6</button>
                <button className='btn_c' onClick={() => chooseOperator('*')}>*</button>
                <button className='btn_c'>%</button>
            </div>
            <div>
                <button className="btn_number" onClick={() => appendNumber('1')}>1</button>
                <button className="btn_number" onClick={() => appendNumber('2')}>2</button>
                <button className="btn_number" onClick={() => appendNumber('3')}>3</button>
                <button className='btn_c' onClick={() => chooseOperator('-')}>-</button>
                <button className='btn_c'>1/x</button>
            </div>
            <div>
                <button className="btn_number" onClick={() => appendNumber('0')}>0</button>
                <button className="btn_number">.</button>
                <button className="btn_number">+/-</button>
                <button className='btn_c' onClick={() => chooseOperator('+')}>+</button>
                <button className='btn_c' onClick={calculate}>=</button>
            </div>
        </div>
        </span>
     );
}

export default Calculator;