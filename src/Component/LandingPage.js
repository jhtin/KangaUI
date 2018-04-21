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

import Paper from 'material-ui/Paper';
import Image from "../header.jpg";



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

          <Row id = "header">

            <img id = "backgroundHeader" src = {require("../header.jpg")}/>

            <Row>
              <Col md={6} mdOffset={2} style = {{marginTop: 200,}}>
                <h1>Group buy authentic products with Kanga</h1>
                <Paper style={{ height: 75}}>Hi</Paper>
              </Col>
            </Row>
          </Row>
          <Grid>

          {this.state.loading ?
          <div style={{marginTop: 100, display: 'flex', justifyContent: 'center'}}>
            <CircularProgress size={80} thickness={5} />
          </div> :
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
          </div>}
        </Grid>
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
