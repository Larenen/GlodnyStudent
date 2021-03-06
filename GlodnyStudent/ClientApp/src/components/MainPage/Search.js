import React, { Component } from 'react'
import './Search.css';
import PropTypes from 'prop-types';

export default class Search extends Component {

    constructor(props) {
        super(props);
    
        this.state = {street:this.props.address};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitMain = this.handleSubmitMain.bind(this);
        this.handleSubmitRestaurationList= this.handleSubmitRestaurationList.bind(this);
        
      }

    handleChange(event) {
        this.setState({street: event.target.value});
      }

    handleSubmitMain(event) {
        this.context.router.history.push(`/ListaRestauracji/${this.state.street}`);
        event.preventDefault();
      }

      static contextTypes = {
        router: PropTypes.object
      }


      handleSubmitRestaurationList(event){
        this.props.onAddressUpdate(this.state.street);
        event.preventDefault();
      }


  render() {
    const sub =this.props.isMain ? this.handleSubmitMain : this.handleSubmitRestaurationList;
    const defAddress = this.props.address?decodeURIComponent(this.props.address):"";
    return (

        <form id="search" className="searchContainer wow fadeInLeft" data-wow-duration="2s" onSubmit={sub}>
          <input className="searchInput" type="text" defaultValue={defAddress}  placeholder="Tu wpisz nazwę ulicy" onChange={this.handleChange} required/>
          <input className="searchBtn" type="submit" value="Szukaj"/>
        </form>
    )
  }


}