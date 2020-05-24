import React, { Component } from 'react';
import axios from 'axios';

import 'trix';
import 'trix/dist/trix.css';

export class Wysywig extends Component {
  constructor(props) {
    super(props);
    this.trixInput = React.createRef();

    this.state = {
      baseImage: ''
    }
  }

  componentDidMount() {
    this.trixInput.current.addEventListener("trix-change", event => {
      this.props.onChange(event.target.innerHTML); //calling custom event
    });
    this.trixInput.current.addEventListener("trix-attachment-add", event => {
      var attachment = event.attachment;
      if (attachment.file) {
        this.getBaseFile(attachment.file);
      }
    });
  }

  // function to capture base64 format of an image
  getBaseFile = (file) => {
    let Base64 = require('js-base64').Base64;
    // create a local readable base64 instance of an image
    this.setState({
      baseImage: Base64.encode(file)
    });
    let imageObj = {
      name: "base-image-" + Date.now(),
      data: Base64.encode(file).toString()
    };
    alert(imageObj.name);
    axios.post('/images/upload', imageObj)
      .then((data) => {
        if (data.data.success) {
          alert("Image has been successfully uploaded using base64 format");
        }
      })
      .catch((err) => {
        alert("Error while uploading image using base64 format");
      });
  };

  render() {
    return (
      <div>
        <input type="hidden" id="trix" value={this.props.value} />
        <trix-editor input="trix" ref={this.trixInput} />
      </div>
    );
  }
}

export default Wysywig;
