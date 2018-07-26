import React, { Component } from "react";
import Hotel from "./../../components/hotel";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Container } from "../../components/Grid";
import API from "./../../utils/API";
import $ from "jquery";
import firebase from "firebase"
import FBApp from "../../utils/firebase";

function reloadPage() {
  window.location.reload();
}

class Hotels extends Component {
  state = {
    hotellist: [],
    name: "",
    location: "",
    rating: "",
    cost: "$$",
    www: ""
  };

  componentDidMount() {
    this.loadHotels();
  }

  loadHotels = () => {
    API.getHotels()
      .then(res =>
        this.setState({
          hotel: res.data,
          name: "",
          location: "",
          rating: "",
          cost: "",
          text:"",
          www: ""
        })
      )
      .catch(err => console.log(err));
  };

  deleteHotel = id => {
    API.deleteHotel(id)
      .then(res => this.loadHotels())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.location && this.state.name) {
      API.saveHotel({
        name: this.state.name,
        location: this.state.location,
        rating: this.state.rating,
        cost: this.state.cost,
        text: this.state.text,
        www: this.state.www
      })
        .then(res => this.loadHotels())
        .catch(err => console.log(err));
    }

    reloadPage();
  };

  render() {
    return (
      <main>
        <div className="row">
          <div className="col s12">
            <div className="card-panel hotels">
              <div className="row nomargin">
                <div className="col s12">
                  <h3 class="pagename">Hotels</h3>
                  <hr></hr>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <div className="center-align">
                    <a id="showAdd" className="waves-effect waves-light btn-small">Want to Submit A Hotel?</a>
                    <a id="hideAdd" className="waves-effect waves-light btn-small">Hide 'Add A Hotel'</a>
                  </div>
                </div>
                <div className="col s12 formbox">
                  <div className="container">
                  <form onSubmit={this.handleFormSubmit}>
                    <div className="row">
                    <h3 className="col s12 submittitle">Submit a Hotel</h3>
                    <Input
                      className="input-field col s12 l4"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      name="name"
                      placeholder="Hotel Name (required)"
                    />
                    <Input
                      className="input-field col s12 l7 offset-l1"
                      value={this.state.location}
                      onChange={this.handleInputChange}
                      name="location"
                      placeholder="Address (required)"
                    />
                    </div>
                    <div className="row">
                    <Input
                      className="input-field col s12 l1"
                      value={this.state.rating}
                      onChange={this.handleInputChange}
                      name="rating"
                      placeholder="Rating"
                    />
                    <Input
                      className="input-field col s12 l1 offset-l1"
                      value={this.state.cost}
                      onChange={this.handleInputChange}
                      name="cost"
                      placeholder="Cost"
                    />
                     <Input
                      className="input-field col s12 l8 offset-l1"
                      value={this.state.www}
                      onChange={this.handleInputChange}
                      name="www"
                      placeholder="Web Page"
                    />
                    </div>
                    <div className="row">
                    <Input
                      className="input-field col s12"
                      value={this.state.text}
                      onChange={this.handleInputChange}
                      name="text"
                      placeholder="Description"
                    />
                    </div>
                    <FormBtn
                      disabled={!(this.state.location && this.state.name)}
                      onClick={this.handleFormSubmit}
                    >
                      Submit Hotel
                    </FormBtn>
                  </form>
                  </div>
                </div>
                <div className="col s12 l6 offset-l3">
                  <p>
                    <Hotel />
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <div className="container">
                    {/* <p>
                    <Review />
                  </p> */}
                    {/* <div className="card-panel hotel"></div>
                                            <div className="card-panel hotel"></div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
$( document ).ready(function() {
  firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) { 
  $('#showAdd').click(function(){
    $('.formbox').show();
    $('#showAdd').hide();
    $('#hideAdd').show();
  });
  $('#hideAdd').click(function() {
    $('.formbox').hide();
    $('#hideAdd').hide();
    $('#showAdd').show();
  })
}
else {
  $('#showAdd').addClass('disabled');
}
  });
});

export default Hotels;
