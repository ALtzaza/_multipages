import Counter from "../../components/Counter/Counter";
import Timer from "../../components/Timer/Timer";
import Add from "../../components/Add/Add";
import Temperatures from "../../components/Temperatures/Temperatures";

import './components.css'

function Component() {
    return ( 
        <div className="component-container">
            <h1>REACT COMPONENTS</h1>
            <div className="guk">
                <div><Counter/><Timer/></div>
                <div><Add aValue={10} bValue={20}/></div>

            </div>
            <Temperatures name={'Temperature'} intiCelsius={10} />
        </div>
     );
}

export default Component;