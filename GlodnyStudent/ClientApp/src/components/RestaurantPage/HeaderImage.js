import React, { Component } from 'react';
import imageRestaurant from'../assets/restaurantImage.jpg';

export default class HeaderImage extends Component {
    render() {

        return (
            <div>
                <div className="mainImage">
                    <img src={imageRestaurant} />
                </div>
            </div>
        )
    }
}
