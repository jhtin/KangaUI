import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Payments from './Payments'
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';
import SocialShare from 'material-ui/svg-icons/social/share';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';
import { Button, ButtonToolbar, ProgressBar, Modal, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Countdown from 'react-countdown-now';
import Dialog from 'material-ui/Dialog';
// import Modal from 'react-modal'
import Pusher from 'pusher-js';
var parseString = require('xml2js').parseString;

class ProductDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      showQR: false,
      loading: false,
      qrLink: "",
      tick: false,
    }
  }

  handleOpen = () => {
    this.setState({showQR: true});
  };

  handleClose = () => {
    this.setState({showQR: false});
  };

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
        let qrLink =result.alipay.response[0].alipay[0].small_pic_url[0];
        console.log(qrLink);
        this.setState({loading:false, qrLink: qrLink, showQR: true})
      }.bind(this));
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
    this.setState({loading:true})
  }

  componentDidMount(){
    Pusher.logToConsole = true;

    var pusher = new Pusher('195abd45d1ec0862ec50', {
      cluster: 'ap1',
      encrypted: true,
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      console.log("data",data);
      if (data.hasOwnProperty("message")){
        pusher.disconnect();
        this.setState({tick: true});
      }
    }.bind(this));
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
          <div style={{paddingRight:100, paddingLeft:100, paddingTop:50, width:"60%",float:"left"}}>
            <h5>Authentic Australian Honey - Made with love</h5>
            <h1>{this.props.title}</h1>
            <h3>Red Hill, Victoria</h3>
            <br />
            {this.props.description}
          </div>
          {this.state.loading ?
          <div style={{marginTop: 100, display: 'flex', justifyContent: 'center', marginLeft: 5, flexGrow: 1}}>
            <CircularProgress size={80} thickness={5} />
          </div> : null}
          {(this.state.showQR && !this.state.loading) ?
            <div className="static-modal">
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>AliPay QR</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                {this.state.tick ?
                  <div>
                    <Alert bsStyle="success">
                      <strong>Buy in confirmed!</strong>
                    </Alert>
                  </div> :
                  <div>
                    <Payments qrLink={this.state.qrLink} />
                  </div>
                }
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </div> : null}
          {(!this.state.loading) ?
          <div style={{marginTop: 100, marginLeft: 50, marginRight: 50, flexGrow: 1}}>
            <Card>
              <CardActions style={{marginLeft: 50, marginRight: 50, paddingBottom: 20}}>
                <h1 style={{display:"inline-block", fontWeight: "bold"}}>¥{this.props.price} RMB</h1><span style={{fontWeight: "bold"}}>per 500 ml</span>
                <div style={{paddingBottom: 10}}>
                  {this.state.tick ?
                    <ProgressBar bsStyle="success" now={100} /> :
                    <ProgressBar bsStyle="danger" now={99} />
                  }
                </div>
                <div style={{paddingBottom: 10}}>
                  <span style={{fontWeight: "bold"}}>99 purchased</span>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                  <Button block bsStyle="danger" bsSize="large" onClick={() => this.getAliPay()}>
                    Buy In
                  </Button>
                </div>
              </CardActions>
              <CardActions style={{marginLeft: 50, marginRight: 50, paddingBottom: 20}}>
                <div style={{display: "flex", justifyContent: "center", fontWeight: "bold", fontSize: 36}}>
                  <Countdown date={Date.now() + 1000000} />
                </div>
                <div style={{display: "flex", justifyContent: "center", fontWeight: "bold", fontSize: 14, color: "#ECECEC"}}>
                  Days : Hours : Minutes : Seconds
                </div>
              </CardActions>
            </Card>
          </div>: null}
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
  },
  content: {
    border: '0',
    borderRadius: '4px',
    bottom: "auto",
    height: 300,  // set height
    left: '50%',
    padding: '2rem',
    position: 'fixed',
    right: 'auto',
    top: '50%', // start from center
    transform: 'translate(-50%,-' + 0 + ')', // adjust top "up" based on height
    width: '40%',
    maxWidth: '40rem'
  }
}

export default ProductDetail;
