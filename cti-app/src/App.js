// src/App.js
import React from 'react';
import Login from './components/login';
import Upload from './components/upload';
import Search from './components/search';

class App extends React.Component {
  state = {
    account: null
  };

  handleLogin = (account) => {
    this.setState({ account });
  };

  render() {
    return (
      <div>
        {this.state.account ? (
          <>
            <h1>Welcome, {this.state.account}</h1>
            <Upload />
            <Search />
          </>
        ) : (
          <Login onLogin={this.handleLogin} />
        )}
      </div>
    );
  }
}

export default App;
