import React , {useState, useEffect} from 'react';

import './wheel.css';
const items = [1,3,1,10,1,3,1,5,1,5,3,1,10,1,3,1,5,1,3,1,20,1,3,1,5]
function getcolorOf(i){
    switch(i){
        case 1 : return "yellow";
        case 3 :return "green";
        case 5: return "blue";
        case 10: return "purple";
        case 20 :return "red"
    }
}

function Wheel({item, setBet}) {
  const wheelVars = {
    '--nb-item': items.length,
    '--selected-item': item?items.indexOf(item):"",
  };
  const spinning = item ? 'spinning' : '';
  return (
    <div className="wheel-container">
      <div className={`wheel ${spinning}`} style={wheelVars} >
        {items.map((item, index) => (
          <div className="wheel-item" key={index} style={{ '--item-nb': index,color:getcolorOf(item) }} onClick={() => setBet(item)} >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wheel

