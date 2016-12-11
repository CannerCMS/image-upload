# image-upload [![NPM version][npm-image]][npm-url]  [![Dependency Status][daviddm-image]][daviddm-url]
> image uploader

## Installation

```sh
$ npm install --save image-upload
```

## Props

- onChange (`function(value)`): called every change, if `multiple` to true `value` is an array.

- closeEditPopup (`function`): called when close

- editPopup (`bool`): should popup show or not

- multiple (`bool`): should uplaod multiple or not.

## Usage

```js
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
		console.log(value)
	}

	render() {

		return (
			<div>
				<button onClick={this.showPopup}>show edit</button>
				<ImageUpload
					closeEditPopup={this.closePopup}
					editPopup={this.state.popup}
					onChange={this.onChange}
					multiple={true}
				/>
			</div>
		);
	}
}

ReactDOM.render(
  <Demo/>
, document.getElementById('root'));

```

## Start example server

```
node devServer.js
```

## License

Apache-2.0 © [Canner]()


[npm-image]: https://badge.fury.io/js/image-upload.svg
[npm-url]: https://npmjs.org/package/image-upload
[travis-image]: https://travis-ci.org/Canner/image-upload.svg?branch=master
[travis-url]: https://travis-ci.org/Canner/image-upload
[daviddm-image]: https://david-dm.org/Canner/image-upload.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Canner/image-upload
