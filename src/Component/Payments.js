import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Payments extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <img src={this.props.qrLink} />
      </div>
    );
  }
}

export default Payments;
