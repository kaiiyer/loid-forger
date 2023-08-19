// src/components/Validator.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './validator.css';

class Validator extends Component {
  state = {
    records: [
      'Record 1',
      'Record 2',
      'Record 3',
      // ... other records
    ],
    selectedRecord: '',  // To store the selected record
    submittedNumber: '',
  };

  handleRecordSelect = (selectedRecord) => {
    this.setState({ selectedRecord });
  };

  handleRecordChange = (event) => {
    this.setState({ selectedRecord: event.target.value });
  };

  handleInputChange = (event) => {
    this.setState({ submittedNumber: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
    // This alert will be shown when the "Submit" button is clicked
    alert('Selected Record: ' + this.state.selectedRecord + ', Submitted Number: ' + this.state.submittedNumber);
    // Here you can handle the submission, e.g., send the number and record to an API
  };
  
  handleViewPoC = () => {
    const { selectedRecord } = this.state;

    // Replace with your server API endpoint
    const url = `/api/ioc/?poc=${selectedRecord}`;

    // Trigger file download
    window.open(url, '_blank');
  };

  render() {
    return (
      <>
        <h1 className="title">Validator Panel</h1>
        <div className="validator-content">
          <h2>Uploaded Records:</h2>
          
          <div className="form-container">
            <form onSubmit={this.handleSubmit}>
              <label>
                Select Record:
                <select value={this.state.selectedRecord} onChange={this.handleRecordChange}>
                  <option value="" disabled>Select a record</option>
                  {this.state.records.map((record, index) => (
                    <option key={index} value={record}>{record}</option>
                  ))}
                </select>
              </label>
              
              {this.state.selectedRecord && (
                // The type attribute is specified as "button" to prevent form submission
                <button type="button" onClick={this.handleViewPoC}>
                  View PoC
                </button>
              )}
              
              <label>
                Submit IoC score:
                <input
                  type="number"
                  value={this.state.submittedNumber}
                  onChange={this.handleInputChange}
                />
              </label>
              
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        
        <div className="validator-link">
          <Link to="/">Back to Home Page</Link>
        </div>
      </>
    );
  }
}

export default Validator;
