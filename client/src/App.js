import React, { Component } from 'react';
import './App.css';
import rest from 'rest';
import mime from 'rest/interceptor/mime';
import Header from './components/Header';
import Footer from './components/Footer';
// import InkList from './components/InkList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inks: [],
      user: { name: 'rhay', id: 1 },
      navItems: [
        { id: 'data', path: '/data', name: 'Stats' },
        { id: 'login', path: '/login', name: 'Login', extraClass: 'right'}
      ],
      mainPage: true
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
      <div className="wrapper">
        <Header navItems={this.state.navItems} mainPage={this.state.mainPage}/>
        {this.props.children || "Nothing Here"}
        <Footer user={this.state.user}/>
      </div>
  );
  }
}

export default App;
