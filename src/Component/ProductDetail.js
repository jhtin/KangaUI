import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Payments from './Payments'

class ProductDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      showQR: false,
    }
  }

  render() {
    return (
      <div style={{width:"100%", display:"flex"}}>
        <div style={{}}>
          <img src={this.props.img} />
        </div>
        {this.state.showQR ?
        <div style={{marginLeft: 5, flexGrow: 1}}>
          <Payments qrLink="https://mobilecodec.alipay.com/show.htm?code=bax07811gumrxvgzsxi920d2&picSize=L" />
        </div> :
        <div style={{marginLeft: 5, flexGrow: 1}}>
          <h1 style={{textAlign: "center"}}>{this.props.title}</h1>
          <h2 style={{textAlign: "center"}}>{this.props.producer}</h2>
          <p style={{textAlign: "center"}}>{this.props.description}</p>
          <RaisedButton label="Buy In" primary={true} fullWidth={true} onClick={() => this.setState({showQR: true})}/>
        </div>}
      </div>
    );
  }
}

export default ProductDetail;
