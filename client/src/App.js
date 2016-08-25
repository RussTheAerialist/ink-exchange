import React, { Component } from 'react';
import './App.css';
import rest from 'rest';
import mime from 'rest/interceptor/mime';
import InkList from './components/InkList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inks: [],
      user: undefined
    };
  }

  componentDidMount() {
    let client = rest.wrap(mime);
    client({ path: 'http://localhost:8000/inks'}).then(
      (response) => {
        console.dir(response.entity);
        this.setState({inks: response.entity.data});
      }
    )
  }

  render() {
    return (
      <div className="App">
        <InkList inks={this.state.inks} />
      </div>
    );
  }
}

export default App;
