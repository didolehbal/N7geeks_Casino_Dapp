import React from 'react';

import './wheel.css';
const  items  = [1,3,1,10,1,3,1,5,1,5,3,1,10,1,3,1,5,1,3,1,20,1,3,1,5]

export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem() {
      console.log("ok")
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * items.length);
   
      this.setState({ selectedItem });
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 500);
    }
  }

  render() {
    const { selectedItem } = this.state;
    console.log(items[selectedItem])
    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    };
    const spinning = selectedItem !== null ? 'spinning' : '';

    return (
      <div className="wheel-container">
        <div className={`wheel ${spinning}`} style={wheelVars} onClick={this.selectItem}>
          {items.map((item, index) => (
            <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
}