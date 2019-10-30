import React, { Component } from 'react';
import Quote from './Quote';
import Input from './Input';
import pangrams from '../../data/pangrams.json';

class Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: pangrams[Math.floor(Math.random() * pangrams.length)],
      userEntry: '',
      unlockMin: 10,
      host: window.location.hostname.replace(/^www\./,''),
      inputComplete: false,
    }

    this.updateUserEntry = this.updateUserEntry.bind(this);
  }

  updateUserEntry(e) {
    this.setState({
      userEntry: e.target.value,
      inputComplete: e.target.value === this.state.quote
    })
  }

  render() {
    let { removeScreen } = this.props;

    return (
      <div className="focus__screen">
        <h1 className="focus__screen__header">
          Are you sure you want to do that?
        </h1>
        <Quote prompt={this.state.quote} userEntry={this.state.userEntry}/>
        <Input value={this.state.userEntry} onChange={this.updateUserEntry} />
        <button className={this.state.inputComplete && 'active'} onClick={this.props.removeScreen}>Continue to {this.state.host} →</button>
      </div>
    )
  }
}

export default Screen;