import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ImageUpload from '../src/index';
import firebase from 'firebase';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.showPopup = this.showPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);

    this.state = {
      popup: false,
      currentUser: null
    };

    this.serviceConfig = {
      name: 'firebase'
    };
    const config = {
      apiKey: "AIzaSyBVa6g2IPH2mSJhOOq07llNPGDJH1PECq8",
      authDomain: "test-39127.firebaseapp.com",
      databaseURL: "https://test-39127.firebaseio.com",
      projectId: "test-39127",
      storageBucket: "test-39127.appspot.com",
      messagingSenderId: "534685848415"
    };
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
    this.login();
  }

  showPopup() {
    this.setState({
      popup: true
    });
  }

  closePopup() {
    this.setState({
      popup: false
    });
  }

  onChange(value) {
    console.log(value);
  }

  login() {
    if (this.auth.currentUser) {
      this.setState({currentUser: this.auth.currentUser});
      return Promise.resolve();
    }
    return this.auth.signInAnonymously();
  }

  onAuthStateChanged(user) {
    if (user) {
      this.setState({currentUser: user});
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.showPopup}>show edit</button>
        <ImageUpload
          closeEditPopup={this.closePopup}
          editPopup={this.state.popup}
          onChange={this.onChange}
          serviceConfig={this.serviceConfig}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Demo/>
, document.getElementById('root'));
