import { useState } from 'react';

import './Counter.css';

function Counter(props){
    
    
    // let value = props.value;
         //read  write        initial
    const [value, setValue] = useState(props.value || 0);


    function increment(){
        setValue(value + 1)
        console.log(value)    
    }
    function decrement(){
        setValue(value - 1)
        console.log(value)
    }


    return(
        <div className="counter-container">
    <h3 className='counter-title'>{props.name || "COUNTER"}</h3>
    <button className='counter-button counter-dec' onClick={decrement}>-</button>
    <span className='counter-value'>{value}</span>
    <button className='counter-button counter-inc' onClick={increment}>+</button>
    </div> 
    )

}


export default Counter;
