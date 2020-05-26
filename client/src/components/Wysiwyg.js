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
        this.uploadImage(attachment);
      }
    });
  }

  uploadImage = (attachment) => {
    let imageFormObj = new FormData();
    imageFormObj.append("imageName", "multer-image-" + Date.now());
    imageFormObj.append("imageData", attachment.file);
    // Configure to allow for image uploading
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.post('/images/upload', imageFormObj, config)
      .then((data) => {
        if (data.data.success) {
          // updates attributes of attachment with correct URL to uploaded image
          let imageURL = window.location.hostname + '/' + data.data.image.data;
          attachment.setAttributes({
            url: imageURL
          })
        }
      })
      .catch((err) => {
        alert("Error while uploading image using multer");
      });
  }

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
