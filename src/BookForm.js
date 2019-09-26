import React, { Component } from "react";
import { connect } from "react-redux";
import { postBook } from "./store/actions";
import * as actionCreators from "./store/actions/index";

class BookForm extends Component {
  state = {
    title: "",
    color: ""
  };

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  submitBook = event => {
    event.preventDefault();
    this.props.postBook(this.state, this.props.closeModal);
  };

  textChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    //const errors = this.props.errors;

    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {/* {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )} */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              value={this.state.title}
              onChange={event => this.textChangeHandler(event)}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <select
              className="cars"
              onChange={event => {
                this.textChangeHandler(event);
                console.log(event);
              }}
            >
              <option value="select">Select a color</option>
              <option value="blue">Blue</option>
              <option value="white">White</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
            </select>
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.rootErrors.errors,
    postBook: postBook
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postBook: (newBook, closeModal) =>
      dispatch(actionCreators.postBook(newBook, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);

// export default BookForm;
