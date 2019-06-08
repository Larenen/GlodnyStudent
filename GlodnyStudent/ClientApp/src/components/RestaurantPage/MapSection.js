import React, { Component } from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import './MapSection.css';

export default class MapSection extends Component {

    constructor(props){
        super(props);
        this.state={
            street:"",
            streetNumber:"",
            localNumber:"",
            district:"Bemowo",
            disabledSubmit:true,
            streetValidResult:false,
            streetNumberValidResult:false,
            localNumberValidResult:false,
            streetNumberErrorMessage:"",
            zoom: 17
        }
        
       /*  this.handleInputChange = this.handleInputChange.bind(this); */
        this.inputValidate = this.inputValidate.bind(this);
        this.makeAddresObject = this.makeAddresObject.bind(this);
    }

    zoomIn = () => {
      this.setState({
        zoom: Math.min(this.state.zoom + 1, 18)
      })
    }
  
    zoomOut = () => {
      this.setState({
        zoom: Math.max(this.state.zoom - 1, 1)
      })
    }

   /*  handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });

      } */

    
      makeAddresObject(){
        const {street,streetNumber,localNumber,district} = this.state;
       return {street,streetNumber,localNumber,district};
      }


    inputValidate(event){
      const value = event.target.value;
      const name = event.target.name;
      const nameValid = name + "ValidResult";
      const {streetNumberValidResult,streetValidResult,localNumberValidResult} = this.state;
      let validResult =true;
      let eventValid = false;
      const regNumbersAndOneLetterAtEnd = /^\d+[a-zA-Z]?$/;
      const regEmp = /^$/;
      let errorMessage = "";  

      if(regEmp.test(String(event.target.value))){
        validResult =false;
      }else{
        switch(event.target.name) {
          case "street":
              eventValid= (event.target.value.length > 0)?true:false;   
               validResult = eventValid && streetNumberValidResult && localNumberValidResult;
            break;
          case "streetNumber":
              eventValid = regNumbersAndOneLetterAtEnd.test(String(event.target.value));
              validResult = eventValid && streetValidResult && localNumberValidResult;
              errorMessage  = (eventValid  )?"":"Numer ulicy musi składać się z ciągu samych cyfr, ewentulalnie zakończonego jedną literą";            
            break;
          case "localNumber":
              eventValid = value;
              validResult = eventValid && streetNumberValidResult && streetValidResult;           
            break;
          case "district":
              eventValid= true;
              validResult = localNumberValidResult && streetNumberValidResult && streetValidResult;           
            break;       
          default:
        }
      }
     

      this.setState({
        disabledSubmit: !validResult,
        [name]: value,
        [nameValid]:eventValid,
        streetNumberErrorMessage:errorMessage
      });

    }

    render() {
      const {street,streetNumber,localNumber,district} = this.props.address;
        const districts = ["Bemowo","Białołęka","Bielany","Mokotów","Ochota","Praga-Południe","Praga-Północ","Rembertów","Śródmieście",
                           "Targówek","Ursus","Ursynów","Wawer","Wesoła","Wilanów","Włochy","Wola","Żoliborz"];
        const districtsList = districts.map(district=><option key={district} value={district}>{district}</option>);



        const editInputs = this.props.ownerLogIn&&sessionStorage.getItem("id")?
        <form onSubmit={(e)=>this.props.updateAddress(e,"address", this.makeAddresObject(),`${this.props.restaurantId}/UpdateAddress`)} id="addressInfo">
        <div className="label-form">
            <label htmlFor="street">Ulica</label> 
            <input id="street" className="inputStyle" type="text" name="street" onChange={this.inputValidate} />
        </div>
        <div className="label-form">
            <label htmlFor="streetNumber">Numer ulicy</label>
            <input id="streetNumber" className="inputStyle" type="text" name="streetNumber" onChange={this.inputValidate} />
            <p className="errorInfo">{this.state.streetNumberErrorMessage}</p>
        </div>
        <div className="label-form">
            <label htmlFor="localNumber">Numer lokalu</label>
            <input id="localNumber" className="inputStyle" type="number" min="0" name="localNumber" onChange={this.inputValidate} />
        </div>
        <div className="label-form">
            <label htmlFor="district">Dzielnica</label>
            <select id="district" className="inputStyle" name="district" onChange={this.inputValidate}>
              {districtsList}
            </select>
        </div>
      <input className="buttonAccept" type="submit" disabled={this.state.disabledSubmit} value="Zapisz"/>
  </form>:"";





        return (
            <div>
              <div className="map">
                  <div className="mainMap">
                  <Map center={[50.874, 4.6947]} zoom={this.state.zoom}>
                    <Marker anchor={[50.874, 4.6947]} payload={1} onClick={({ event, anchor, payload }) => {}}/>
                  </Map>
                  </div>

                  <button onClick={this.zoomIn}><i className="fas fa-search-plus"></i></button>
                  <button onClick={this.zoomOut}><i className="fas fa-search-minus"></i></button>
              </div>
              <div className="mapInfo">
                  <h3 className="wow fadeIn" data-wow-duration="2s">Znajdź nas na mapie!</h3>                  
                  <address className="wow fadeIn" data-wow-duration="2s">
                    <i className="fas fa-map-marker-alt fa-2x"></i> {street} {streetNumber}/{localNumber} {district}
                  </address>
                    {editInputs}
                  <button className="wow fadeIn" data-wow-duration="2s">Zobacz na mapach google</button>
              </div>
            </div>
        )
    }
}
