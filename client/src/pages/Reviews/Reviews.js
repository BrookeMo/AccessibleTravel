import React, { Component } from "react";
import Review from "./../../components/review";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from './../../utils/API';
import $ from "jquery";
import firebase from "firebase"
import FBApp from "../../utils/firebase";

function reloadPage()
{
  window.location.reload();
}

class Reviews extends Component {
state = {
    reviewlist: [],
    location: "",
    author: "",
    text: "",
    rating: "",
  };

  componentDidMount() {
    this.loadReviews();
  };

  loadReviews = () => {
    API.getReviews()
      .then(res =>
        
      
        this.setState({ review: res.data, location: "", author: "", text: "" ,rating: "", })
      )
      .catch(err => console.log(err));
  };

  deleteReview = id => {
    API.deleteReview(id)
      .then(res => this.loadReviews())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // console.log('handling form submit ...');
    event.preventDefault();
    if (this.state.location && this.state.author) {
      API.saveReview({
        location: this.state.location,
        author: this.state.author,
        rating: this.state.rating,
        text: this.state.text
      })
        .then(res => this.loadReviews())
        .catch(err => console.log(err));
    }

    reloadPage();

  };


render (){
  console.log('howdy from review.js');
  return (
    <main>
      <div className="row">
        <div className="col s12">
          <div className="card-panel hotels">
            <div className="row nomargin">
              <div className="col s12">
                <h3 className="pagename">Reviews</h3>
                <hr></hr>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <div className="center-align">
                  <a id="showADD" className="waves-effect waves-light btn-small">Want to Submit A Review?</a>
                  <a id="hideADD" className="waves-effect waves-light btn-small">Hide 'Add A Review'</a>
                </div>
              </div>
              <div className="col s12 formbox">
                <div className="container">
                  <form onSubmit={this.handleFormSubmit}>
                    <div className="row">
                    <h3 className="col s12 submittitle">Submit a Review</h3>
                    <Input
                      className="col s12 l3"
                      value={this.state.author}
                      onChange={this.handleInputChange}
                      name="author"
                      placeholder="Author (required)"
                    />
                    <Input
                      className="col s12 l4 offset-l1"
                      value={this.state.Location}
                      onChange={this.handleInputChange}
                      name="location"
                      placeholder="Location (required)"
                    />
                    <Input
                      className="col s12 l3 offset-l1"
                      value={this.state.Rating}
                      onChange={this.handleInputChange}
                      name="rating"
                      placeholder="Rating 1-5(required)"
                    />
                    </div>
    {/* <Input
                      value={this.state.Destination}
                      onChange={this.handleInputChange}
                      name="destination"
                      placeholder="Destination (required)"
                    />*/}
                    <div className="row">
                    <TextArea
                      className="col s12 reviewbox"
                      value={this.state.Review}
                      onChange={this.handleInputChange}
                      name="review"
                      placeholder="Review (Optional)"
                    />
                    </div>
                    <FormBtn
                      disabled={!(this.state.location && this.state.author)}
                      onClick={this.handleFormSubmit}
                    >
                      Submit Review
                    </FormBtn>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col s6">
                  <p>
                    <Review />
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
      </div>
    </main>
  );
};
};
$( document ).ready(function() {
  firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) { 
    $('#showADD').click(function(){
      $('.formbox').show();
      $('#showADD').hide();
      $('#hideADD').show();
  });
    $('#hideADD').click(function() {
      $('.formbox').hide();
      $('#hideADD').hide();
      $('#showADD').show();
  })
}
else {
  $('#showAdd').addClass('disabled');
}
  });
});
export default Reviews;
