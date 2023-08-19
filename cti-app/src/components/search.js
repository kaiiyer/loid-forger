// src/components/Search.js
import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: []
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ query: event.target.value });
  }

  async handleSearch() {
    console.log('Search button clicked');
    try {
      // Replace with your server API endpoint
      const response = await axios.get('http://localhost:5000/api/search', {
        params: { ip: this.state.query }
      });

      console.log('API Response:', response.data);

      // Check the response data structure and update the state
      if (response.data && Array.isArray(response.data.results)) {
        this.setState({ results: response.data.results }, () => {
          console.log('Updated state:', this.state.results);
        });
      } else {
        console.warn('API response does not contain an array:', response.data);
        this.setState({ results: [] });
      }

    } catch (error) {
      console.error('Search failed:', error);
      this.setState({ results: [] });
    }
  }

  render() {
    console.log('Rendering with results:', this.state.results);

    return (
      <div>
        <input
          type="text"
          placeholder="Search by IP or Hash"
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search</button>
        <ul>
          {this.state.results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Search;