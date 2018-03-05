import React, { Component } from "react";
import { connect } from "react-redux";
import MovieItem from "./MovieItem";

const mapStateToProps = state => ({
  movies: state.reducer.movies
});

let flex = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-around"
};

class Movies extends Component {
  render() {
    let movieItems = this.props.movies.map(movie => {
      return <MovieItem movie={movie} />;
    });
    return <div style={flex}>{movieItems}</div>;
  }
}

export default connect(mapStateToProps, null)(Movies);
