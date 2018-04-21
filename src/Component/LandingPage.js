import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import Modal from 'react-modal';
import ProductDetail from './ProductDetail'
import FlatButton from 'material-ui/FlatButton';

class LandingPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      productModal: false,
      selected: []
    }
    this.closeModal = this.closeModal.bind(this);
    this.tilesData = [
      {
        img: 'https://www.abelandcole.co.uk/media/1606_18557_z.jpg',
        title: 'Product title',
        producer: 'Producer',
        description: 'product description',
        price: '$100',
        _id: "asdasd"
      },
      {
        img: 'https://www.abelandcole.co.uk/media/1606_18557_z.jpg',
        title: 'Tasty burger',
        producer: 'pashminu',
        description: 'product description',
        price: '$100',
        _id: "dfsdfdsfsdv"
      },
      {
        img: 'https://www.abelandcole.co.uk/media/1606_18557_z.jpg',
        title: 'Camera',
        producer: 'Danson67',
        description: 'product description',
        price: '$100',
        _id: "sdfdfbgdvxc"
      },
      {
        img: 'https://www.abelandcole.co.uk/media/1606_18557_z.jpg',
        title: 'Breakfast',
        producer: 'jill111',
        description: 'product description',
        price: '$100',
        _id: "ijsdfjksdnjdskscnkcs"
      },
      {
        img: 'https://www.abelandcole.co.uk/media/1606_18557_z.jpg',
        title: 'Tasty burger',
        producer: 'pashminu',
        description: 'product description',
        price: '$100',
        _id: "sdvbhvdcjndj"
      },
      {
        img: 'https://www.abelandcole.co.uk/media/1606_18557_z.jpg',
        title: 'Camera',
        producer: 'Danson67',
        description: 'product description',
        price: '$100',
        _id: "ieuriewuyrieuyuer"
      },
    ];
  }

  showProduct(product){
    let selected = [<ProductDetail {...product} key={0}/>]
    this.setState({productModal:true, selected:selected})
  }

  closeModal(){
    this.setState({productModal:false, selected:[]});
  }

  componentWillMount() {
    Modal.setAppElement('body');
 }

  render() {
    return (
      <div>
        <div>
        {this.state.productModal ?
        null:
        <AppBar
          title="Title"
        />
        }
        </div>
        <div style={styles.root}>
          <GridList
            cols = {4}
            cellHeight={400}
            style={styles.gridList}
          >
            {this.tilesData.map((tile) => (
              <GridTile
                onClick = {() => this.showProduct(tile)}
                style={styles.card}
                key={tile._id}
                title={tile.title}
                subtitle={<span>by <b>{tile.author}</b></span>}
                actionIcon={<IconButton><ActionShoppingCart color="white" /></IconButton>}
              >
                <img src={tile.img} />
              </GridTile>
            ))}
          </GridList>
        </div>
        <div style={{}}>
          <Modal
            isOpen={this.state.productModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            {this.state.selected}
          </Modal>
        </div>
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
