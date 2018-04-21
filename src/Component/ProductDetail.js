import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Payments from './Payments'
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';
import SocialShare from 'material-ui/svg-icons/social/share';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';
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
      <div>
        <div>
          <Card>
            <CardMedia
            overlayContentStyle = {{background:"rgba(0,0,0,0)", height: "100%"}}
            overlay={
              <div style={{width:"100%", display:"flex"}}>
                <div style={{marginTop: 400, display: 'flex', flexGrow: 1}}>
                  <RaisedButton style={{marginLeft: 10, marginBottom: 10}} ><span style={{paddingTop:10, paddingBottom:10, paddingLeft:10, paddingRight:10, fontSize: 18}}>View Photos</span></RaisedButton>
                  <RaisedButton style={{marginLeft: 10, marginBottom: 10}} ><span style={{paddingTop:10, paddingBottom:10, paddingLeft:10, paddingRight:10, fontSize: 18}}>{this.props.producer}</span></RaisedButton>
                </div>
                <div style={{marginTop: 10, marginRight: 10}}>
                  <RaisedButton
                    label="Share"
                    default={true}
                    style={style.button}
                    icon={<SocialShare />}
                  />
                  <RaisedButton
                    label="Save"
                    default={true}
                    style={style.button}
                    icon={<ToggleStarBorder />}
                  />
                </div>
              </div>
            }
            >
              <img style={style.banner} src={"http://www.marsglobalexim.com/wp-content/uploads/2018/03/cropped-manuka-honey-banner.jpg"} />
            </CardMedia>
          </Card>
        </div>
        <div style={{width:"100%", display:"flex"}}>
          <div style={{paddingRight:100, paddingLeft:100, paddingTop:50, width:"50%",float:"left"}}>
            <h3>Authentic Australian Honey - Made with love</h3>
            <h1>{this.props.title}</h1>
            <h2>Red Hill, Victoria</h2>
            <h3>{this.props.description}</h3>
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
          <div style={{marginTop: 100, marginLeft: 50, marginRight: 50, flexGrow: 1}}>
            <Card>
              <CardActions style={{marginLeft: 50, marginRight: 50, paddingBottom: 20}}>
                <h1 style={{display:"inline-block"}}>¥{this.props.price} RMB</h1><span>per 500 ml</span>
                <div style={{display: "flex", justifyContent: "center"}}>
                  <RaisedButton style={{height: '20px'}} secondary={true} onClick={() => this.getAliPay()}>
                    <span style={{paddingLeft:100, paddingRight:100, fontSize: 36, color: "white"}}>Buy In</span>
                  </RaisedButton>
                </div>
              </CardActions>
            </Card>
          </div> : null}
        </div>
      </div>
    );
  }
}

const style = {
  banner: {
    display: "block",
    // maxWidth:400,
    maxHeight:450,
    width: "auto",
    height: "auto",
  },
  button: {
    marginRight: 5
  }
}

export default ProductDetail;
