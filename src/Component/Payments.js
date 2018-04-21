import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

class Payments extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  handleImageLoaded(){
    this.setState({loading: false})
  }

  render() {
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}>
          <img
          src={this.props.qrLink}
          />
        </div>
      </div>
    );
  }
}

export default Payments;
