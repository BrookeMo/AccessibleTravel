import React, { Component } from 'react'
import API from './../../utils/API'

class Hotel extends Component {
  constructor (props){
    super(props)
    this.state = {}
  } 

componentDidMount(){
  this.getHotels();
}

  getHotels(){
    API.getHotels().then((res)=>{
      this.setState({hotelList : res.data});
    }) 
  
  }
    render(){
        return <div className='hotel'>
          {this.state.hotelList ? 
          this.state.hotelList.map(
            (hotel, i) =>
              <div className="border" key={i}>
                <div className="row nomargin">
                  <h4 className="hotelName col s12">{hotel.name}</h4>
                </div>
                <div className="row nomargin">
                  <h6 className="hotelAddress col s12">Address: {hotel.location}</h6>
                </div>
                <div className="row nomargin">
                  <p className="hotelRating col s2">Rating: {hotel.rating}</p>
                  <p className="hotelPrice col s2 offset-s1">Cost: {hotel.cost}</p>
                  <a className="hotelWebsite link col s6 offset-s1">Website: {hotel.www}</a>
                </div>
                <div className="row nomargin">
                  <p className="hotelDescription col s12">Description: {hotel.text}</p>
                </div>
                <div className="row nomargin">
                  <p className="addedDate col">Added the {hotel.name} on {hotel.date}</p>
                </div>

 


              </div>
            
          )
:
null
}
        </div>
    }
  };

  export default Hotel;
