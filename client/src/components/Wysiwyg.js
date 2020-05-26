import React, { Component } from 'react';
import axios from 'axios';

import Trix from 'trix';
import 'trix/dist/trix.css';

Trix.config.attachments.preview.caption = {
  name: false,
  size: false
};

export class Wysywig extends Component {
  constructor(props) {
    super(props);
    this.trixInput = React.createRef();
  }

  componentDidMount() {
    this.trixInput.current.addEventListener("trix-change", event => {
      this.props.onChange(event.target.innerHTML); //calling custom event
    });
    this.trixInput.current.addEventListener("trix-attachment-add", event => {
      var attachment = event.attachment;
      if (attachment.file) {
        this.getFile(attachment);
      }
    });
  }

  // function to capture base64 format of an image
  getFile = (attachment) => {
    let Base64 = require('js-base64').Base64;
    let imageObj = {
      name: "base-image-" + Date.now(),
      data: Base64.encode(attachment.file).toString()
    };
    axios.post('/images/upload', imageObj)
      .then((data) => {
        if (data.data.success) {
          console.log("Image has been successfully uploaded using base64 format");
          let imageURL = '/images/' + data.data.image._id;
          alert(imageURL);
          // updates attributes of attachment with correct URL to uploaded image
          attachment.setAttributes({
            url: imageURL,
            href: imageURL
          });
        }
      })
      .catch((err) => {
        console.log("Error while uploading image using base64 format");
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
