import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import * as actions from "./Actions";
import { withStyles } from "material-ui/styles";
import {
  MenuItem,
  FormControl,
  Select,
  Chip,
  Input,
  InputLabel
} from "material-ui";

const mapDispatchToProps = dispatch => ({
  fetchByGenres: (ids, page = 1) => {
    dispatch(actions.FETCH_BY_GENRES(ids, page));
  },
  fetchGenres: () => {
    dispatch(actions.FETCH_GENRES());
  }
});

const mapStateToProps = state => ({
  genres: state.filtersReducer.genres
});

class SearchGenres extends Component {
  constructor() {
    super();
    this.state = {
      value: []
    };
  }

  componentDidMount() {
    this.props.fetchGenres();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      genres: nextProps.genres
    });
  }

  addValue = value => {
    this.state.value.push(value);
    this.setState({ value: this.state.value });
  };

  removeValue = value => {
    this.state.value = this.state.value.filter(genre => {
      return genre !== value;
    });
    this.setState({ value: this.state.value });
  };

  handleChange = e => {
    if (!this.state.value.includes(e.target.value)) {
      this.addValue(e.target.value);
    } else {
      this.removeValue(e.target.value);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.fetchByGenres(this.state.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select
          multiple={true}
          value={this.state.value}
          onChange={this.handleChange}
        >
          {this.props.genres.map(genre => {
            return (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
        <input value="submit" type="submit" />
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchGenres);
