import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ImageUpload from '../src/index';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.showPopup = this.showPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);

    this.state = {
      popup: false
    };
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

  render() {
    return (
      <div>
        <button onClick={this.showPopup}>show edit</button>
        <ImageUpload
          closeEditPopup={this.closePopup}
          editPopup={this.state.popup}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Demo/>
, document.getElementById('root'));
