import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import axios from 'axios';
import ProductDetail from './ProductDetail'
import FlatButton from 'material-ui/FlatButton';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';

import Paper from 'material-ui/Paper';
import Image from "../header.jpg";

import MapsLocalDining from 'material-ui/svg-icons/maps/local-dining';
import ImageBlurOn from 'material-ui/svg-icons/image/blur-on';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';




class LandingPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      productShow: false,
      selected: [],
      loading: true,
      tilesData: [],
    }
    this.closeModal = this.closeModal.bind(this);
  }

  showProduct(product){
    let selected = [<ProductDetail {...product} key={0}/>]
    this.setState({productShow:true, selected:selected})
  }

  closeModal(){
    this.setState({productModal:false, selected:[]});
  }

  componentWillMount() {

 }

 getProducts() {
  axios.get('http://47.74.64.81/products')
  .then(function (response) {
    console.log(response);
    this.processCatalog(response);
  }.bind(this))
  .catch(function (error) {
    console.log(error);
  });
 }

 processCatalog(response){
   this.setState({loading: false, tilesData: response.data})
 }

 componentDidMount() {
   this.getProducts();
 }

  renderApp(){
    if (this.state.productShow){
      return(
        <div>
          <div>
            <AppBar
              title="Title"
            />
          </div>
          <div>
            {this.state.selected}
          </div>
        </div>
      )
    }else{
      return (
        <div>
          <div>
            <AppBar
              title="Title"
            />
          </div>
          {this.state.loading ?
          <div style={{marginTop: 100, display: 'flex', justifyContent: 'center'}}>
            <CircularProgress size={80} thickness={5} />
          </div> :
          <div>
          <Row id = "header">
            
            <img id = "backgroundHeader" src = {require("../header.jpg")}/>
            <div id = "backgroundOverlay"/>
            <Grid>
              <Row>
              <Col md={9} style = {{marginTop: 100}}>
                <h1 className = "headerstyle">Group buy authentic Australian products with <span style = {{fontWeight: 600 }}>Kanga</span></h1>
                
                <Paper style={{ height: 75}}></Paper>

                <h1 className = "subhead">All vendors verified by nab</h1>


              </Col>
              </Row>
            </Grid>
          </Row>
          <Grid>
            <Row>
              <Col md={12}>
              <h1>Browse categories</h1>
              </Col>
              <Col md={3} style = {{marginTop: 10}}>
                <Paper style = {{ height: 50}}><MapsLocalDining style = {{
                  width: 50,
                  height: 50,
                }}/> 
                <span className = "cattitles">Food</span>
                </Paper>
              </Col>
              <Col md={3} style = {{marginTop: 10}}>
                <Paper style = {{ height: 50}}><ImageBlurOn style = {{
                  width: 50,
                  height: 50,
                }}/> 
                <span className = "cattitles">Jewelery</span>
                </Paper>
                </Col>

                <Col md={3} style = {{marginTop: 10}}>
                <Paper style = {{ height: 50}}><ActionFavorite style = {{
                  width: 50,
                  height: 50,
                }}/> 
                <span className = "cattitles">Health</span>
                </Paper>
              </Col>
            </Row>
            <Row style = {{marginTop: 100}}>
            <Col md={12}>
              <h1>Essentials for Health</h1>
              </Col>
            <Col md= {12}>
            <Paper style = {{ height: 300}}  className = "inner_div" >
                <div className = "colorOverlay"/>

                <Col md = {3} style = {{ height: 300, background: "#1d3557"}}> 
                <div className= "featuretext" style={{paddingTop: '180px'}}>BeesKness Lavender Infused Honey</div>

                  <ProgressBar bsStyle="danger" now={60}/>
                </Col>
                <Col md = {9}> 

                  <img className = "featureimage" src = {require("../header.jpg")}/>
                  <div className = "colorOverlay"/>

                </Col>
                </Paper>
            </Col>
            </Row>
          </Grid>
          {/*
          <div style={styles.root}>
            <GridList
              cols = {4}
              cellHeight={400}
              style={styles.gridList}
            >
              {this.state.tilesData.map((tile) => (
                <GridTile
                  onClick = {() => this.showProduct(tile)}
                  style={styles.card}
                  key={tile._id}
                  title={tile.title}
                  subtitle={<span>by <b>{tile.producer}</b></span>}
                  actionIcon={<IconButton><ActionShoppingCart color="white" /></IconButton>}
                >
                  <img src={tile.img} />
                </GridTile>
              ))}
            </GridList>
          </div>
            */}
          </div>}
        </div>


      );
    }
  }

  render() {
    return (
      <div>
        {this.renderApp()}
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: "100%",
    // height: 450,
    overflowY: 'auto',
  },
  card: {
    marginTop: 10,
  },
};

export default LandingPage;
