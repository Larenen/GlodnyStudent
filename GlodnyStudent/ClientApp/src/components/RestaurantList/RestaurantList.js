import React, { Component } from 'react'
import ListItem from './ListItem';
import './RestaurantList.css'
import Filters from './Filters';
import Sort from './Sort';
 import Search from  '../MainPage/Search';
import '../MainPage/Search.css'; 
/* import {host} from '../../config' */

export class RestaurantList extends Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getDataByFilters = this.getDataByFilters.bind(this);
    this.addressUpdate = this.addressUpdate.bind(this);
    this.state = {
      address:this.props.address,
      error: null,
      distance:5,// przykladowe dane statyczne ("polowa" najwyzej wsrod cen)
      price:55,// przykladowe dane statyczne ("polowa" najwyzej wsrod cen)
      cuisine:'Amerykańska',
      highestPrice: 99,
      sort:'priceGrowingly',
      restaurations: [ // przykladowe dane statyczne , dane z serwera beda pobierane po 20 i po kliknieciu  "dalej" beda doladowyawane
        /* {id:"0",name: "Piękna restauracja1", cuisine: "Włoska", address: "Jana Pawła2 21/37",reviewsCount:"69", image: '',highestPrice:99,distance:11},
        {id:"1",name: "Piękna restauracja2", cuisine: "Polska", address: "Jana Pawła2 21/37",reviewsCount:"169", image: '',highestPrice:50,distance:100},
        {id:"2",name: "Piękna restauracja3", cuisine: "Azjatycka", address: "Jana Pawła2 21/37",reviewsCount:"169", image: '',highestPrice:25,distance:13},
        {id:"3",name: "Piękna restauracja4", cuisine: "Amerykańska", address: "Jana Pawła2 21/37",reviewsCount:"69", image: '',highestPrice:100,distance:12}    */
      ],
      cuisines: ['Amerykańska','Polska','Włoska','Azjatycka'] // przykladowe dane statyczne
    };
  }

componentDidMount(){
  this.getDataByAddress();
}

getDataByAddress(){
  const address = `api/Restaurants/${this.state.address}`;
  fetch(address).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Restauration not found');
    }
  })
  .then((result) => {
    this.setState({
      error:false,
      restaurations: result
    });
  })
  .catch((error) => {
    console.log(error);
    this.setState({
      error
    }); 
  });
}




    getDataByFilters(event){
      console.log("getData");
      const address = `api/Restaurants?address=${this.state.address}&distance=${this.state.distance}&highestPrice=${this.state.price}&cuisine=${this.state.cuisine}`;
      fetch(address).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Restauration not found');
        }
      })
      .then((result) => {
        this.setState({
          error:false,
          restaurations: result
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error
        }); 
      });
    }



  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addressUpdate(addr){
    this.setState({
      address:addr
  }, () => {
    this.getDataByAddress();
  });
  }

  

  render() {

    const { error, restaurations,cuisines,distance,price,highestPrice,sort} = this.state;
    let list 
    if (error) {
      list= <div>Nie znaleziono restauracji o podanych parametrach.</div>; 
    } else {
       list = restaurations.map((restauration)=><ListItem key={restauration.id} name={restauration.name} 
        address={restauration.address}  reviewsCount={restauration.reviewsCount} image={restauration.image}/>);
    }   
      return (        
        <div id="restaurantListContainer">
          <Search onAddressUpdate={this.addressUpdate} isMain={false}/>
          <Filters onConfirmFilters={this.getDataByFilters} cuisines={cuisines} distance={distance} price={price} highestPrice={highestPrice} onSetFilter={this.handleInputChange} />
          <Sort sort={sort} restaurations={restaurations} onSetSort={this.handleInputChange} />
          <ul id="restaurantList">{list}</ul>
        </div>
      );
  

  }
}