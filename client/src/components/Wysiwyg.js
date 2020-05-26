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

    axios.post('/images/upload', imageFormObj, { 'Content-Type': 'multipart/form-data' })
      .then((data) => {
        if (data.data.success) {
          alert("Image has been successfully uploaded using multer");
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
