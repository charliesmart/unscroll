import React, { Component } from 'react';

class Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: 'Lorem ipsum...',
      unlockMin: 10,
    }
  }

  render() {
    let { removeScreen } = this.props;
    
    return (
      <div className="focus__screen">
        <h1 className="focus__screen__header">
          Are you sure you want to do that?
        </h1>
        <button onClick={removeScreen}>Yes, I'm sure</button>
      </div>
    )
  }
}

export default Screen;