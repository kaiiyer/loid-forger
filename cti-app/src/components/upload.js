// src/components/Upload.js
import React from 'react';
import axios from 'axios';

class Upload extends React.Component {
  state = {
    file: null,
    ip: '',
    hash: ''
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
    formData.append('file', this.state.file);
    formData.append('ip', this.state.ip);
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
      <div>
        <input type="file" accept="application/pdf" onChange={this.handleFileChange} />
        <input type="text" name="ip" placeholder="IP" onChange={this.handleInputChange} />
        <input type="text" name="hash" placeholder="Hash" onChange={this.handleInputChange} />
        <button onClick={this.handleSubmit}>Upload</button>
      </div>
    );
  }
}

export default Upload;
