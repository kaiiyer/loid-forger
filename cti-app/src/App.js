// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/login';
import Upload from './components/upload';
import Search from './components/search';
import Validator from './components/validator';
import './App.css'

class App extends React.Component {
  state = {
    account: null
  };

  handleLogin = (account) => {
    this.setState({ account });
  };

  render() {
    return (
      <Router>
        <div className="dashboard-container">
          {this.state.account ? (
            <Routes>
              {/* Route to render the Home component */}
              <Route path="/" element={<Home account={this.state.account} />} />
              {/* Route to render the Validator component */}
              <Route path="/validator" element={<Validator />} />
            </Routes>
          ) : (
            <Login onLogin={this.handleLogin} />
          )}
        </div>
      </Router>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <>
        <h1>Welcome, {this.props.account}</h1>
        <div className="connected-container">
          <Search />
          <Upload />
        </div>
        <div className="validator-link">
          <Link to="/validator">Validator Panel</Link>
        </div>
      </>
    );
  }
}


export default App;
