// src/components/Upload.js
import React from 'react';
import axios from 'axios';
import './upload.css';
class Upload extends React.Component {
  state = {
    file: null,
    ip: '',
    hash: '',
    domain: ''
  };

  handleFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    const formData = new FormData();
    formData.append('Proof of concept Document', this.state.file);
    formData.append('IP', this.state.ip);
    formData.append('Domain', this.state.domain);
    formData.append('hash', this.state.hash);

    
    try {
      // Replace with your server API endpoint
      const response = await axios.post('localhost:5000/api/upload', formData);
      console.log('File uploaded:', response.data);
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  render() {
    return (
      <div className="upload-form">
        <input type="text" name="ip" placeholder="IP" onChange={this.handleInputChange} />
        <input type="text" name="domain" placeholder="Domain" onChange={this.handleInputChange} />
        <input type="text" name="hash" placeholder="Hash" onChange={this.handleInputChange} />
        <input type="file" accept="application/pdf" onChange={this.handleFileChange} />
        <button onClick={this.handleSubmit}>Upload</button>
      </div>
    );
  }
}

export default Upload;
