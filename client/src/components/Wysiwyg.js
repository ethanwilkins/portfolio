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
    // creates a reference to trix-editor enabling event listers to be added below
    this.trixInput = React.createRef();
  }

  componentDidMount() {
    // gets called on every change for trix-editor
    this.trixInput.current.addEventListener("trix-change", event => {
      // calls function that sets state.body in parent element with innerHTML
      this.props.onChange(event.target.innerHTML);
    });
    this.trixInput.current.addEventListener("trix-attachment-add", event => {
      let attachment = event.attachment;
      if (attachment.file) {
        this.uploadImage(attachment);
      }
    });
    // deletes image from server when attachment is removed
    this.trixInput.current.addEventListener("trix-attachment-remove", event => {
      if (event.attachment && event.attachment.file && event.attachment.file.name) {
        const path = event.attachment.file.name;
        // deletes image at path
        axios.delete(`/images/${path}`)
        .then((data) => {
          if (data.data.success) {
            console.log("Successfully deleted image at " + path + ".");
          }
        })
        .catch(() => {
          console.log("Error while deleting image.");
        });
      }
    });
    this.trixInput.current.addEventListener("trix-initialize", event => {
      // sets value of trix-editor when value prop is passed in from EditPost
      if (this.props.value) {
        let stored = this.props.value;
        event.target.editor.loadHTML(stored);
      }
    });
  }

  uploadImage = (attachment) => {
    let imageFormObj = new FormData();
    imageFormObj.append("imageName", "multer-image-" + Date.now());
    imageFormObj.append("imageData", attachment.file);
    axios.post('/images/upload', imageFormObj)
      .then((data) => {
        if (data.data.success) {
          // updates attributes of attachment with correct URL to uploaded image
          let imageURL = data.data.image.data;
          attachment.setAttributes({
            url: '/' + imageURL
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
