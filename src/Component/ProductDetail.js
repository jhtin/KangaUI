import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Payments from './Payments'
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';
var parseString = require('xml2js').parseString;

class ProductDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      showQR: false,
      loading: false,
      qrLink: ""
    }
  }

  getAliPay(){
    console.log("amount", this.props.price)
    axios.get('http://47.74.64.81/payment', {
      params: {
        "amount": this.props.price,
      }
    })
    .then(function (response) {
      console.log(response);
      parseString(response.data, function (err, result) {
        console.log(result);
        let qrLink =result.alipay.response[0].alipay[0].pic_url[0];
        console.log(qrLink);
        this.setState({loading:false, qrLink: qrLink, showQR: true})
      }.bind(this));
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
    this.setState({loading:true})
  }

  render() {
    return (
      <div style={{width:"100%", display:"flex"}}>
        <div style={{}}>
          <img src={this.props.img} />
        </div>
        {this.state.loading ?
        <div style={{marginTop: 100, display: 'flex', justifyContent: 'center', marginLeft: 5, flexGrow: 1}}>
          <CircularProgress size={80} thickness={5} />
        </div> : null}
        {(this.state.showQR && !this.state.loading) ?
        <div style={{marginLeft: 5, flexGrow: 1}}>
          <Payments qrLink={this.state.qrLink} />
        </div> : null}
        {(!this.state.showQR && !this.state.loading) ?
        <div style={{marginLeft: 5, flexGrow: 1}}>
          <h1 style={{textAlign: "center"}}>{this.props.title}</h1>
          <h2 style={{textAlign: "center"}}>{this.props.producer}</h2>
          <p style={{textAlign: "center"}}>{this.props.description}</p>
          <RaisedButton label="Buy In" primary={true} fullWidth={true} onClick={() => this.getAliPay()}/>
        </div> : null}
      </div>
    );
  }
}

export default ProductDetail;
