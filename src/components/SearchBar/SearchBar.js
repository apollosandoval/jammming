import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };

    this.search=this.search.bind(this);
    this.handleTermChange=this.handleTermChange.bind(this);
  } // end of constructor

  handleTermChange(event) {
    this.setState({searchTerm: event.target.value});
  } // end of handleTermChange()
  search() {
    this.props.onSearch(this.state.searchTerm);
    // console.log(this.state.searchTerm);
  }
  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
